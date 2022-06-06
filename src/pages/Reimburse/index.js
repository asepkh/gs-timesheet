import useController from "./controller";

import { Table, Button } from "antd";
import ModalReimburse from "@/components/ModalReimburse";

const Reimburse = () => {
  const {
    column,
    data,
    isLoading,
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
        loading={isLoading}
        pagination={{
          total: totalPages,
          current: queries.page,
          onChange: (currentPage) => setQueries({ page: currentPage }),
        }}
      />

      <ModalReimburse
        {...modal}
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
