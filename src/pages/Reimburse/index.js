import useController from "./controller";

import { Table, Button } from "antd";
import ModalReimburse from "@/components/ModalReimburse";

const Reimburse = () => {
  const {
    column,
    data,
    isLoading,
    add,
    update,
    totalPages,
    modal,
    setModal,
    queries,
    setQueries,
    onFinish,
  } = useController();

  return (
    <>
      <div style={{ display: "flex", justifyContent: "end", marginBottom: 20 }}>
        <Button
          onClick={() =>
            setModal({
              initialValues: {},
              title: "Buat Laporan Reimburse",
              visible: true,
            })
          }
          type="primary"
        >
          Buat Laporan Reimburse
        </Button>
      </div>

      <Table
        columns={column}
        dataSource={data}
        scroll={{ x: 1200 }}
        loading={isLoading}
        // total={2}
        pagination={{
          total: totalPages * queries.limit,
          onChange: (currentPage) => setQueries({ page: currentPage }),
        }}
      />

      <ModalReimburse
        {...modal}
        isLoading={add.isLoading || update.isLoading}
        onFinish={onFinish}
        onCancel={() =>
          setModal({
            ...modal,
            initialValues: {},
            visible: false,
          })
        }
      />
    </>
  );
};

export default Reimburse;
