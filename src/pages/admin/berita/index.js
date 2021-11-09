import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useRecoilState } from "recoil";
import swal from "sweetalert";
import CustomButton from "../../../components/customButton";
import EditedModal from "../../../components/editedModal";
import TableData from "../../../components/table";
import TambahBeritaExcel from "../../../components/tambahBeritaExcel";
import TambahModal from "../../../components/tambahModal";
import Title from "../../../components/title";
import services from "../../../process/services";
import atom from "../../../state";
import color from "../../../utility/color";

const Berita = () => {
  const [counter, setCounter] = useRecoilState(atom.beritaCounter);

  const handleDelete = (id) => {
    swal({
      title: "Apakah anda yakin ingin menghapus semua data?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        services.deleteBerita(id).then((_) => {
          swal("Data berhasil dihapus", {
            icon: "success",
          });
          setCounter(counter + 1);
        });
      }
    });
  };

  const columns = [
    {
      dataField: "judul",
      text: "Judul",
      sort: true,
      headerStyle: {
        backgroundColor: color.red,
        color: color.gray,
        border: "none",
      },
    },
    {
      dataField: "sumber",
      text: "Sumber",
      sort: true,
      headerStyle: {
        backgroundColor: color.red,
        color: color.gray,
        border: "none",
      },
    },
    {
      dataField: "isi",
      text: "Isi",
      headerStyle: {
        backgroundColor: color.red,
        color: color.gray,
        border: "none",
      },
    },
    {
      dataField: "id",
      text: "Action",
      headerStyle: {
        backgroundColor: color.red,
        color: color.gray,
        border: "none",
      },
      formatter: (_, row) => {
        const { id, judul, sumber, isi } = row;
        return (
          <Fragment>
            <div className="mb-1">
              <EditedModal judul={judul} sumber={sumber} isi={isi} id={id} />
            </div>
            <div className="mb-1" onClick={() => handleDelete(id)}>
              <CustomButton
                title="Delete"
                textColor={color.gray}
                bgColor={color.red}
                id={id}
              />
            </div>
          </Fragment>
        );
      },
    },
  ];

  const defaultSortedDataset = [
    {
      dataField: "judul",
      order: "asc",
    },
  ];

  const [data, setData] = useState([]);

  const getBerita = useCallback(async () => {
    const berita = await services.getBerita();
    setData(berita.data.data);
  }, []);

  useEffect(() => {
    if (counter >= 0) getBerita();
  }, [counter, getBerita]);

  return (
    <Container className="mt-3">
      <Title title="Berita" />
      <div className="mt-4" />
      <div className="row">
        <div className="m-1 col-md-2">
          <TambahModal />
        </div>
        <div className="m-1 col-md-4">
          <TambahBeritaExcel />
        </div>
      </div>
      <TableData
        data={data}
        columns={columns}
        defaultSorted={defaultSortedDataset}
      />
    </Container>
  );
};

export default Berita;
