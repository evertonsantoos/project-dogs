import React from "react";
import Head from "../Helper/Head";
import useFetch from "../../Hooks/useFetch";
import { STATS_GET } from "../../api";
import Loading from "../Helper/Loading";
import Error from "../Helper/Error";

// React.lazy é usado para carregamento dinâmico (lazy loading) de componentes.
// Isso significa que o componente só será carregado quando for realmente necessário,
// ou seja, quando for renderizado pela primeira vez.
// Aqui, o UserStatsGraphs será importado de forma assíncrona, o que ajuda a reduzir o tamanho
// inicial do bundle da aplicação e melhora a performance.
const UserStatsGraphs = React.lazy(() => import("./UserStatsGraphs"));

const UserStats = () => {
  const { data, error, loading, request } = useFetch();

  React.useEffect(() => {
    async function getData() {
      const { url, options } = STATS_GET();
      await request(url, options);
    }
    getData();
  }, [request]);

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  if (data)
    return (
      // React.Suspense é necessário para lidar com componentes carregados com React.lazy.
      // O fallback é o que será mostrado enquanto o componente UserStatsGraphs estiver a ser carregado.
      <React.Suspense fallback={<div></div>}>
        <Head title="Estátisticas" />
        <UserStatsGraphs data={data} />
      </React.Suspense>
    );
  else return null;
};

export default UserStats;
