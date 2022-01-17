import React, { useState } from 'react';
import { useTablePipeline, features, BaseTable } from 'ali-react-table';
import styles from './index.less';

type BaseType = {
  dataSource: any;
  columns: any;
  primaryKey: string; // rowkey
  stickyTop?: number; // 表头吸顶后，距离顶部的距离，默认为 0
  loading?: boolean;
  isSum?: boolean; // 是否首行带合计
  childKey: string; // 子项name的key
  childGrade: string; // 子项层级的key
  sortClick?: (sort_obj: SortItem[]) => void; // 排序功能
  childTreeFun?: (id: string) => void; // 展开项请求方法
  rowClick?: (row_obj: any) => void; // 行点击功能
};
const MyTreeTable: React.FC<BaseType> = (props) => {
  const {
    dataSource,
    loading,
    primaryKey,
    stickyTop,
    childKey,
    childGrade,
    isSum,
    sortClick,
    childTreeFun,
    rowClick,
    columns,
  } = props;
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const sortChange = (vv: SortItem[]) => {
    sortClick && sortClick(vv);
  };
  const pipeline = useTablePipeline({ components: {} })
    .input({ dataSource, columns })
    .primaryKey(primaryKey);
  // .mapColumns(([firstCol, ...rest]) => [
  //   firstCol,
  //   // 重复几次 columns，看起来更加丰满
  //   ...rest,
  // ]);
  pipeline.use(
    features.sort({
      mode: 'single',
      keepDataSource: true,
      highlightColumnWhenActive: true,
      orders: ['asc', 'desc', 'none'], // asc 升序 desc 降序
      onChangeSorts: sortChange,
    }),
  );
  // 重点》》转换树结构的核心是 数组里一定要有主键的值和子数组的parent_id的值相同
  pipeline.use(features.buildTree(primaryKey, 'parent_id')).use(
    features.treeMode({
      openKeys,
      onChangeOpenKeys(nextKeys, key, action) {
        if (loading) {
          return;
        }
        setOpenKeys(nextKeys);
        const needLoadData = dataSource.every((d) => d['parent_id'] !== key);
        if (action === 'expand' && needLoadData) {
          childTreeFun && childTreeFun(key);
        }
      },
      // 提供一个自定义的 isLeafNode 方法，使得表格为父节点正确渲染收拢/展开按钮
      isLeafNode(node) {
        return node[primaryKey] === 0 || node[childKey];
      },
      stopClickEventPropagation: true,
    }),
  );
  // 行点击
  const rowClickFun = (record: any) => {
    rowClick && rowClick(record);
  };

  return (
    <>
      <BaseTable
        className={styles.myBaseTable}
        style={{
          '--font-size': '13px',
          '--color': '#666666',
          '--header-color': '#000000',
          '--header-bgcolor': '#E4E4E4',
          '--header-row-height': '38px',
          '--row-height': '35px',
          '--cell-padding': '2px 6px',
          minHeight: 385,
        }}
        useVirtual={false}
        stickyTop={stickyTop ? stickyTop : 70}
        isLoading={loading}
        {...pipeline.getProps()}
        getRowProps={(record, rowIndex) => {
          // 自定义行样式
          let childFlag = record[childGrade];
          let style_color = '';
          let style_bgcolor = '';
          let style_background = '';
          if (isSum) {
            if (childFlag === 0) {
              style_color = 'purple';
            } else if (childFlag === 1) {
              style_color = 'green';
            } else {
              if (rowIndex === 0) {
                style_color = 'red';
              } else if (rowIndex > 0 && rowIndex % 2 === 1) {
                style_bgcolor = '#F8F8F8';
                style_background = '#F8F8F8';
              } else {
                style_background = 'white';
              }
            }
          } else {
            if (childFlag === 0) {
              style_color = 'purple';
            } else if (childFlag === 1) {
              style_color = 'green';
            } else if (rowIndex % 2 === 1) {
              style_bgcolor = '#F8F8F8';
              style_background = '#F8F8F8';
            } else {
              style_background = 'white';
            }
          }
          return {
            style: {
              color: style_color,
              '--bgcolor': style_bgcolor,
              background: style_background,
            },
            onClick() {
              rowClickFun(record);
            },
          };
        }}
      />
    </>
  );
};

export default MyTreeTable;
