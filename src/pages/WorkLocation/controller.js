import { useEffect, useState } from "react";
import { useQuery, useMutation } from "react-query";
import {
  getWorkLocation,
  removeWorkLocation,
  addWorkLocation,
  updateWorkLocation,
} from "@/services/workLocation";

import Icon from "@/helpers/Icon";
import { Button, message, Popconfirm, Row, Tooltip } from "antd";

const useController = () => {
  const [modal, setModal] = useState({
      initialValues: {},
      title: "Tambah Work Location",
      visible: false,
    }),
    [queries, setQuery] = useState({ page: 1, limit: 10 }),
    setQueries = (params) => setQuery({ ...queries, ...params });

  const {
    data: res,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery(["workLocation", queries], () => getWorkLocation(queries));

  const add = useMutation(
    (values) => {
      return addWorkLocation(values);
    },
    {
      onSuccess: () => {
        message.success("Work Location Added Successfully");
        setModal({ visible: false });
        refetch();
      },
      onError: (error) => {
        message.error(error?.response?.data?.errorMessage || "Add Work Location Failed");
      },
    }
  );

  const update = useMutation(
    (values) => {
      return updateWorkLocation(values?.id, values);
    },
    {
      onSuccess: () => {
        message.success("Work Location Updated Successfully");
        setModal({ visible: false });
        refetch();
      },
      onError: (error) => {
        message.error(error?.response?.data?.errorMessage || "Update Failed");
      },
    }
  );

  const remove = useMutation(
    (id) => {
      return removeWorkLocation(id);
    },
    {
      onSuccess: () => {
        message.success("Work Location Deleted Successfully");
        refetch();
      },
      onError: (error) => {
        message.error(error?.response?.data?.errorMessage || "Delete Failed");
      },
    }
  );

  const onFinish = (values) => {
    console.log("Success:", values);
    if (modal.title === "Tambah Work Location") add.mutate(values);
    else update.mutate(values);
  };

  useEffect(() => {
    if (!isError) return;

    message.error(error);
  }, [isError, error]);

  const column = [
    {
      title: "#",
      key: "i",
      dataIndex: "i",
      align: "center",
      render: (value) => value + 1,
      width: "40pt",
    },
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      align: "center",
      width: "120pt",
    },
  ];

  const data =
    res?.data?.rows?.length > 0
      ? res?.data?.rows?.map((d, i) => ({
          ...d,
          i,
          description: d.description ? d.description : "-",
          action: (
            <Row key={i} justify="center">
              <Tooltip placement="topLeft" title="Edit">
                <Button
                  className="button-action"
                  type="danger"
                  onClick={() =>
                    setModal({
                      initialValues: d,
                      title: "Edit Work Location",
                      visible: true,
                    })
                  }
                  ghost
                >
                  <Icon type="EditFilled" />
                </Button>
              </Tooltip>
              <Popconfirm
                title="Are you sure？"
                okText="Yes"
                cancelText="No"
                onConfirm={() => remove.mutate(d?.id)}
              >
                <Tooltip placement="topLeft" title="Remove">
                  <Button className="button-action" type="danger">
                    <Icon type="DeleteFilled" />
                  </Button>
                </Tooltip>
              </Popconfirm>
            </Row>
          ),
        }))
      : [
          {
            i: 0,
            name: "-",
            description: "-",
            action: "-",
          },
        ];

  return {
    column,
    data,
    isLoading,
    totalPages: res?.totalPages,
    onFinish,
    modal,
    setModal,
    queries,
    setQueries,
  };
};

export default useController;
