import React, { useCallback, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useRecoilValue } from "recoil";
// import CustomButton from "../../../components/customButton";
import TableData from "../../../components/table";
import TambahLabel from "../../../components/tambahLabel";
import Title from "../../../components/title";
import services from "../../../process/services";
import atom from "../../../state";
import color from "../../../utility/color";

const Label = () => {
  //   const handleDelete = () => {
  //     swal({
  //       title: "Apakah anda yakin ingin menghapus semua data?",
  //       icon: "warning",
  //       buttons: true,
  //       dangerMode: true,
  //     }).then((willDelete) => {
  //       if (willDelete) {
  //         services.deleteAllBerita().then((_) => {
  //           swal("Data berhasil dihapus", {
  //             icon: "success",
  //           });
  //           setDatasetState();
  //           setDatatestState();
  //           setDatatrainState();
  //         });
  //       }
  //     });
  //   };

  const counter = useRecoilValue(atom.beritaCounter);

  const [data, setData] = useState([]);

  const getBerita = useCallback(async () => {
    const berita = await services.getLabel();
    setData(berita.data.data);
  }, []);

  useEffect(() => {
    if (counter >= 0) getBerita();
  }, [counter, getBerita]);

  const columns = [
    {
      dataField: "label",
      text: "Hasil Label",
      sort: true,
      headerStyle: {
        backgroundColor: color.red,
        color: color.gray,
        border: "none",
      },
    },
    {
      dataField: "userlabelId",
      text: "Id User",
      sort: true,
      headerStyle: {
        backgroundColor: color.red,
        color: color.gray,
        border: "none",
      },
    },
    {
      dataField: "beritumId",
      text: "Id Berita",
      sort: true,
      headerStyle: {
        backgroundColor: color.red,
        color: color.gray,
        border: "none",
      },
    },
    // {
    //   dataField: "id",
    //   text: "Action",
    //   headerStyle: {
    //     backgroundColor: color.red,
    //     color: color.gray,
    //     border: "none",
    //   },
    //   formatter: (_, row) => {
    //     const { id } = row;
    //     return (
    //       <div className="mb-1" onClick={() => handleDelete(id)}>
    //         <CustomButton
    //           title="Delete"
    //           textColor={color.gray}
    //           bgColor={color.red}
    //           id={id}
    //         />
    //       </div>
    //     );
    //   },
    // },
  ];

  const defaultSortedDataset = [
    {
      dataField: "label",
      order: "asc",
    },
  ];

  return (
    <Container className="mt-3">
      <Title title="Label" />
        <TambahLabel />
      <TableData
        data={data}
        columns={columns}
        defaultSorted={defaultSortedDataset}
      />
    </Container>
  );
};

export default Label;
