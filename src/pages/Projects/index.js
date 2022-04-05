import { useState } from "react";
import useController from "./controller";

import { Table, Button } from "antd";
import ModalProject from "@/components/ModalProject";

const Projects = () => {
  const [modal, setModal] = useState({
      initialValues: {},
      title: "Tambah Project",
      visible: false,
    }),
    [page, setPage] = useState(1);
  const { column, data, isLoading, totalPages, add, update } = useController({
    queries: { page: 1 },
    setModal,
  });

  const onFinish = (values) => {
    console.log("Success:", values);
    if (modal.title === "Tambah Project") add.mutate(values);
    else update.mutate(values);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "end", marginBottom: 20 }}>
        <Button
          onClick={() =>
            setModal({
              initialValues: {},
              title: "Tambah Project",
              visible: true,
            })
          }
          type="primary"
        >
          Tambah Project
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

      <ModalProject
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

export default Projects;
