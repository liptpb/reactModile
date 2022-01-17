#!/bin/bash

projectname="marketing项目前端UI"
tempPublishDir="dist"
root_path="../../"
versionnumber=$(date +%Y%m%d%H%M%S)
hubDomain="registry.cn-zhangjiakou.aliyuncs.com/drbt_centralizer_business"
image_name="frontend-marketing"

#退到项目根目录
cd $root_path || exit

#确保删除临时发布文件夹
rm -rf $tempPublishDir  || true

echo  ---------------开始 编译、发布项目 $projectname ...------------------
yarn install

yarn run build

echo  ---------------开始build docker镜像...------------------

#构建镜像，并且打上镜像库tag
cd ./${tempPublishDir} || exit
#确保删除config.js
rm -rf "config.js"  || true

#复制镜像所需文件
cp ../scripts/docker/Dockerfile ./

cp ../scripts/docker/nginx.conf ./

docker build -t $hubDomain/${image_name}:${versionnumber} .

docker login -u yl@gudian -p gudian@123 $hubDomain
docker push $hubDomain/${image_name}:${versionnumber}

docker tag $hubDomain/${image_name}:${versionnumber} $hubDomain/${image_name}:latest
docker push $hubDomain/${image_name}:latest

echo   ---------------发布到k8s------------------
ssh -p '20022' 'root@192.168.20.233' "kubectl --insecure-skip-tls-verify set image deploy marketing-report-drbt-ui *=$hubDomain"/"$image_name":"$versionnumber -n drbt-v3-ui"

echo ---------------Clear-Images...------------------
docker rmi -f $(docker images $hubDomain/${image_name} -q)
docker rmi $(docker images -f "dangling=true" -q)

echo ---------------Done...------------------

echo  ---------------结束 编译、发布项目 $projectname ...------------------
