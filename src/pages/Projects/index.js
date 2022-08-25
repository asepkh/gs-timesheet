import useController from "./controller";

import { Table, Button } from "antd";
import ModalProject from "@/components/ModalProject";

const Projects = () => {
  const { column, data, isLoading, totalPages, onFinish, modal, setModal, queries, setQueries } =
    useController();

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
        scroll={{ x: true }}
        loading={isLoading}
        pagination={{
          total: totalPages * queries.limit,
          current: queries.page,
          onChange: (page) => setQueries({ page }),
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
