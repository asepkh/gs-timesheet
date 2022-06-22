import useController from "./controller";

import { Table, Button } from "antd";
import ModalUser from "@/components/ModalUser";

const Users = () => {
  const {
    userColumn,
    userData,
    isLoading,
    isFetching,
    totalPages,
    onFinish,
    queries,
    setQueries,
    modal,
    setModal,
  } = useController();

  return (
    <>
      <div style={{ display: "flex", justifyContent: "end", marginBottom: 20 }}>
        <Button
          onClick={() =>
            setModal({
              title: "Tambah Karyawan",
              initialValues: { isAdmin: false },
              visible: true,
            })
          }
          type="primary"
        >
          Tambah Karyawan
        </Button>
      </div>

      <Table
        columns={userColumn}
        dataSource={userData}
        loading={isLoading || isFetching}
        pagination={{
          total: totalPages * queries.limit,
          current: queries.page,
          onChange: (page) => setQueries({ page }),
        }}
      />
      <ModalUser
        {...modal}
        onFinish={onFinish}
        onCancel={() =>
          setModal({
            ...modal,
            initialValues: { isAdmin: false, gender: "Male" },
            visible: false,
          })
        }
      />
    </>
  );
};

export default Users;
