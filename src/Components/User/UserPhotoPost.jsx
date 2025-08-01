import React from "react";
import styles from "./UserPhotoPost.module.css";
import useForm from "../../Hooks/useForms";
import useFetch from "../../Hooks/useFetch";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import Error from "../Helper/Error";
import { PHOTO_POST } from "../../api";
import { useNavigate } from "react-router-dom";

const UserPhotoPost = () => {
  const nome = useForm();
  const peso = useForm("number");
  const idade = useForm("number");
  const [img, setImg] = React.useState({});
  const { data, error, loading, request } = useFetch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (data) navigate("/conta");
  }, [data, navigate]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!img.raw || !nome.value || !peso.value || !idade.value) {
      alert("Preencha todos os campos e selecione uma imagem válida.");
      return;
    }

    const formData = new FormData();
    formData.append("img", img.raw);
    formData.append("nome", nome.value);
    formData.append("peso", peso.value);
    formData.append("idade", idade.value);

    const token = window.localStorage.getItem("token");
    const { url, options } = PHOTO_POST(formData, token);
    request(url, options);
  }

  function handleImgChange({ target }) {
    const file = target.files[0];

    if (!file.type.match(/image\/(jpeg|jpg|png)/)) {
      alert("Formato inválido. Use .jpg ou .png");
      return;
    }

    setImg({
      preview: URL.createObjectURL(file),
      raw: file,
    });
  }

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <form onSubmit={handleSubmit}>
        <Input label="Nome" type="text" name="nome" {...nome} />
        <Input label="Peso" type="number" name="peso" {...peso} />
        <Input label="Idade" type="number" name="idade" {...idade} />

        <input
          className={styles.file}
          type="file"
          name="img"
          id="img"
          accept="image/jpeg, image/png"
          onChange={handleImgChange}
        />
        <p
          style={{ fontSize: "0.875rem", color: "#666", marginTop: "0.25rem" }}
        >
          Formatos aceitos: <strong>.jpg</strong> e <strong>.png</strong>
        </p>

        {loading ? (
          <Button disabled>Enviando...</Button>
        ) : (
          <Button>Enviar</Button>
        )}
        <Error error={error} />
      </form>

      <div>
        {img.preview && (
          <div
            className={styles.preview}
            style={{ backgroundImage: `url('${img.preview}')` }}
          ></div>
        )}
      </div>
    </section>
  );
};

export default UserPhotoPost;
