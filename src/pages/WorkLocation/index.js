import useController from "./controller";

import { Table, Button } from "antd";
import ModalWorkLocation from "@/components/ModalWorkLocation";

const WorkLocation = () => {
  const { column, data, isLoading, totalPages, onFinish, modal, setModal, queries, setQueries } =
    useController();

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
        scroll={{ x: 1200 }}
        loading={isLoading}
        pagination={{
          total: totalPages * queries.limit,
          current: queries.page,
          onChange: (page) => setQueries({ page }),
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
