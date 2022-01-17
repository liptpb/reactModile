import React from 'react';
import { useTablePipeline, features, BaseTable } from 'ali-react-table';
import styles from './index.less';

type BaseType = {
  dataSource: any;
  columns: any;
  primaryKey: string; // rowkey
  stickyTop?: number; // 表头吸顶后，距离顶部的距离，默认为 0
  loading?: boolean;
  isSum?: boolean; // 是否首行带合计
  sortClick?: (sort_obj: SortItem[]) => void; // 排序功能
  rowClick?: (row_obj: any) => void; // 行点击功能
};
const MyBaseTable: React.FC<BaseType> = (props) => {
  const {
    dataSource,
    loading,
    primaryKey,
    stickyTop,
    isSum,
    columns,
    sortClick,
    rowClick,
  } = props;
  const sortChange = (vv: SortItem[]) => {
    sortClick && sortClick(vv);
  };
  // 跳转函数
  const rowClickFun = (record: any) => {
    rowClick && rowClick(record);
  };
  const pipeline = useTablePipeline({ components: {} })
    .input({ dataSource, columns })
    .primaryKey(primaryKey)
    .use(
      features.sort({
        mode: 'single',
        keepDataSource: true,
        highlightColumnWhenActive: true,
        orders: ['asc', 'desc', 'none'], // asc 升序 desc 降序
        onChangeSorts: sortChange,
      }),
    );

  return (
    <>
      <BaseTable
        className={[styles.myBaseTable, 'compact'].join(' ')}
        style={{
          '--font-size': '13px',
          '--color': '#666666',
          '--header-color': '#000000',
          '--header-bgcolor': '#E4E4E4',
          '--header-row-height': '38px',
          '--row-height': '35px',
          '--cell-padding': '2px 6px',
          // '--highlight-bgcolor':'#6BB0FF',
          // '--header-highlight-bgcolor':'#6BB0FF',
          minHeight: 385,
          // overflow : 'auto'
        }}
        useVirtual={false}
        stickyTop={stickyTop ? stickyTop : 70}
        isLoading={loading}
        {...pipeline.getProps()}
        getRowProps={(record, rowIndex) => {
          // 自定义行样式
          if (isSum) {
            return {
              style:
                rowIndex === 0
                  ? {
                      color: 'red',
                    }
                  : rowIndex % 2 === 1 && rowIndex > 0
                  ? {
                      '--bgcolor': '#F8F8F8',
                      background: '#F8F8F8',
                    }
                  : {
                      background: 'white',
                    },
              onClick() {
                rowClickFun(record);
              },
            };
          } else {
            return {
              style:
                rowIndex % 2 === 1
                  ? {
                      '--bgcolor': '#F8F8F8',
                      background: '#F8F8F8',
                    }
                  : {
                      background: 'white',
                    },
              onClick() {
                rowClickFun(record);
              },
            };
          }
        }}
      />
    </>
  );
};

export default MyBaseTable;
