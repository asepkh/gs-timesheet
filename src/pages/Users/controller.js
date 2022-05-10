import { useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import { getUser, removeUser, register as addUser, updateUser } from "@/services/user";
import { userStore } from "@/store";

import Icon from "@/helpers/Icon";
import { Button, message, Popconfirm, Row, Tooltip } from "antd";

const useController = ({ queries, setModal }) => {
  const {
    data: res,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery(["user", queries], () => getUser({ page: 1 }));
  const user = userStore.useValue();

  const register = useMutation(
    (values) => {
      return addUser(values);
    },
    {
      onSuccess: () => {
        message.success("User Added Successfully");
        setModal({
          visible: false,
        });
        refetch();
      },
      onError: (error) => {
        message.error(error?.response?.data?.errorMessage || "Add User Failed");
      },
    }
  );

  const update = useMutation(
    (values) => {
      return updateUser(values?.id, values);
    },
    {
      onSuccess: () => {
        message.success("User Update Successfully");
        setModal({
          visible: false,
        });
        refetch();
      },
      onError: (error) => {
        message.error(error?.response?.data?.errorMessage || "Update User Failed");
      },
    }
  );

  const remove = useMutation(
    (id) => {
      return removeUser(id);
    },
    {
      onSuccess: () => {
        message.success("User Deleted Successfully");
        refetch();
      },
      onError: (error) => {
        message.error(error?.response?.data?.errorMessage || "Delete Failed");
      },
    }
  );

  useEffect(() => {
    if (!isError) return;

    message.error(error);
  }, [isError, error]);

  const userColumn = [
    {
      title: "#",
      key: "i",
      dataIndex: "i",
      align: "center",
      render: (value) => value + 1,
      width: "40pt",
    },
    {
      key: "profilePic",
      dataIndex: "profilePic",
      align: "center",
      render: (value) => <img src={value} className="profile_picture" alt="profile" />,
    },
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Phone Number",
      key: "phone",
      dataIndex: "phone",
    },
    {
      title: "Role",
      key: "role",
      dataIndex: "role",
    },
    {
      title: "Gender",
      key: "gender",
      dataIndex: "gender",
    },
    {
      title: "Admin Privilege",
      key: "isAdmin",
      dataIndex: "isAdmin",
      align: "center",
      render: (value) =>
        value ? (
          <Icon type="CheckSquareFilled" style={{ color: "#00e600", fontSize: 30 }} />
        ) : (
          <Icon type="CloseSquareFilled" style={{ color: "red", fontSize: 30 }} />
        ),
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      align: "center",
      width: "120pt",
    },
  ];

  const userData =
    res?.data?.rows?.length > 0
      ? res?.data?.rows?.map((d, i) => ({
          ...d,
          i,
          name: d?.firstName + " " + d?.lastName,
          phone: d?.phone || "-",
          role: d?.role || "-",
          action: (
            <Row key={i} justify="center">
              {/* <Tooltip placement="topLeft" title="Timesheet">
                <Button className="button-action" type="primary">
                  <Icon type="CalendarFilled" />
                </Button>
              </Tooltip> */}
              <Tooltip placement="topLeft" title="Edit">
                <Button
                  className="button-action"
                  type="danger"
                  onClick={() =>
                    setModal({
                      initialValues: d,
                      title: "Edit Karyawan",
                      visible: true,
                    })
                  }
                  ghost
                >
                  <Icon type="EditFilled" />
                </Button>
              </Tooltip>
              {d?.id !== user?.id && (
                <Popconfirm title="Are you sure？" okText="Yes" cancelText="No" onConfirm={() => remove.mutate(d?.id)}>
                  <Tooltip placement="topLeft" title="Remove">
                    <Button className="button-action" type="danger">
                      <Icon type="DeleteFilled" />
                    </Button>
                  </Tooltip>
                </Popconfirm>
              )}
            </Row>
          ),
        }))
      : [
          {
            i: 0,
            name: "-",
            email: "-",
            role: "-",
            admin: "-",
            action: "-",
            profilePic: "http://",
          },
        ];

  return {
    userColumn,
    userData,
    isLoading,
    isFetching,
    totalPages: res?.data?.totalPages,
    register,
    update,
  };
};

useController.defaultProps = {
  page: 1,
  setModal: () => {},
};

export default useController;
