import { useState } from "react";
import useController from "./controller";

import { Table, Button } from "antd";
import ModalReimburse from "@/components/ModalReimburse";

const Reimburse = () => {
  const [modal, setModal] = useState({
      initialValues: {},
      title: "Buat Laporan Reimburse",
      visible: false,
    }),
    [page, setPage] = useState(1);

  const { column, data, isLoading, totalPages, add, update } = useController({
    queries: { page: 1 },
    setModal: (values) => setModal({ ...modal, ...values }),
  });

  const onFinish = (values) => {
    console.log("Success:", values);
    if (values?.id) update.mutate(values);
    else add.mutate(values);
  };

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
          current: page,
          onChange: (currentPage) => setPage(currentPage),
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
