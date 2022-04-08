import { useState } from "react";
import useController from "./controller";

import { Table, Button } from "antd";
import ModalWorkLocation from "@/components/ModalWorkLocation";

const WorkLocation = () => {
  const [modal, setModal] = useState({
      initialValues: {},
      title: "Tambah Work Location",
      visible: false,
    }),
    [page, setPage] = useState(1);
  const { column, data, isLoading, totalPages, add, update } = useController({
    queries: { page: 1 },
    setModal: (values) => setModal({ ...modal, ...values }),
  });

  const onFinish = (values) => {
    console.log("Success:", values);
    if (modal.title === "Tambah Work Location") add.mutate(values);
    else update.mutate(values);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "end", marginBottom: 20 }}>
        <Button
          onClick={() =>
            setModal({
              initialValues: {},
              title: "Tambah Work Location",
              visible: true,
            })
          }
          type="primary"
        >
          Tambah Work Location
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

      <ModalWorkLocation
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

export default WorkLocation;
