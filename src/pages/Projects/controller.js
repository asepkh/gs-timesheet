import { useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import {
  getProject,
  removeProject,
  addProject,
  updateProject,
} from "@/services/project";

import Icon from "@/helpers/Icon";
import { Button, message, Popconfirm, Row, Tooltip } from "antd";

const useController = ({ queries, setModal }) => {
  const {
    data: res,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery(["project", queries], () => getProject({ page: 1 }));

  const add = useMutation(
    (values) => {
      return addProject(values);
    },
    {
      onSuccess: () => {
        message.success("Project Added Successfully");
        refetch();
      },
      onError: (error) => {
        message.error(
          error?.response?.data?.errorMessage || "Add Project Failed"
        );
      },
    }
  );

  const update = useMutation(
    (values) => {
      return updateProject(values?.id, values);
    },
    {
      onSuccess: () => {
        message.success("Project Updated Successfully");
        refetch();
      },
      onError: (error) => {
        message.error(error?.response?.data?.errorMessage || "Update Failed");
      },
    }
  );

  const remove = useMutation(
    (id) => {
      return removeProject(id);
    },
    {
      onSuccess: () => {
        message.success("Project Deleted Successfully");
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
                      title: "Edit Project",
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
    totalPages: res?.data?.totalPages,
    add,
    update,
  };
};

useController.defaultProps = {
  queries: { page: 1 },
  setModal: () => {},
};

export default useController;
