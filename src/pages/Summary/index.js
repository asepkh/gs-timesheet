import { useState } from "react";
import useController from "./controller";

import { Table, Button } from "antd";
import ModalUser from "@/components/ModalUser";

const Summary = () => {
  const [modal, setModal] = useState({
      visible: false,
      title: "Tambah Karyawan",
      initialValues: { isAdmin: false, gender: "Male" },
    }),
    [page, setPage] = useState(1);

  const {
    userColumn,
    userData,
    isLoading,
    isFetching,
    totalPages,
    register,
    update,
  } = useController({
    queries: { page: 1 },
    setModal,
  });

  const onFinish = (values) => {
    console.log("Success:", values);

    if (modal?.title === "Tambah Karyawan") register.mutate(values);
    else update.mutate(values);
  };

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
          total: totalPages,
          current: page,
          onChange: (currentPage) => setPage(currentPage),
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

export default Summary;
