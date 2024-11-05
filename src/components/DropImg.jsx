import axios from "axios";
import React from "react";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FiUpload } from "react-icons/fi";

const url = "http://34.136.161.125/";

export const MyDropzone = () => {
  const [selectImages, setSelectImages] = useState([]);

  //const captiinRef = useRef(null);
  const onDrop = useCallback((acceptedFiles) => {
    setSelectImages(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const selctend_imagens = selectImages?.map((file) => (
    <div>
      <img src={file.preview} alt="img" style={{ width: "200px" }} />
    </div>
  ));

  //console.log(selctend_imagens[0].props.children.props.src);

  function onSubmit(ev) {
    ev.preventDefault();
    const imagens = selctend_imagens[0].props.children.props.src.substring(
      5,
      100
    );

    const users = {
      name: "Laudier",
      email: "laudier@gmail.com",
      password: "laudier",
      phone: "(75) 99823-9680",
      imagem: imagens,
    };

    console.log(users);

    setTimeout(() => {
      //console.log({values})
      //const mescla = selectedFile.slice(5, 500);
      axios
        .post(url, users)
        .then(() => {
          alert("Imagem Cadastrado com sucesso");
        })
        .catch((err) => {
          alert(`Houve um erro ao cadastra a imagem, ${err}`);
        });
    }, 2000);
  }

  return (
    <div>
      <div>
        <div {...getRootProps()}>
          <input {...getInputProps()} />

          {!!selctend_imagens ? (
            <FiUpload
              style={{
                width: 360,
                color: "green",
                fontSize: 50,
                marginTop: 60,
              }}
            />
          ) : (
            ""
          )}
        </div>
      </div>
      <button
        type="submit"
        style={{
          width: 360,
          color: "green",
          borderRadius: 6,
          borderColor: "green",
          marginTop: 50,
        }}
        onClick={onSubmit}
      >
        post
      </button>
      <div
        style={{
          margin: "auto",
          display: "flex",
        }}
      >
        {selctend_imagens}
      </div>
    </div>
  );
};
