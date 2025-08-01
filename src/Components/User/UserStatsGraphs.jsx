import React from "react";
import styles from "./UserStatsGraphs.module.css";
import { VictoryBar, VictoryChart, VictoryPie } from "victory";

const UserStatsGraphs = ({ data }) => {
  const [graph, setGraph] = React.useState([]);
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    const graphData = data.map((item) => ({
      x: item.title,
      y: Number(item.acessos),
    }));

    setTotal(data.reduce((acc, item) => acc + Number(item.acessos), 0));
    setGraph(graphData);
  }, [data]);

  return (
    <section className={`${styles.graph} animeLeft`}>
      <div className={`${styles.total} ${styles.graphItem}`}>
        <p>Acessos: {total}</p>
      </div>
      <div className={styles.graphItem}>
        {graph.length > 0 ? (
          <VictoryPie
            data={graph}
            innerRadius={50}
            padding={{ top: 20, bottom: 20, left: 80, right: 80 }}
            style={{
              data: {
                fillOpacity: 0.9,
                stroke: "#fff",
                strokeWidth: 2,
              },
              labels: {
                fontSize: 14,
                fill: "#333",
              },
            }}
          />
        ) : (
          <p>Nenhuma foto foi postada ainda.</p>
        )}
      </div>
      <div className={styles.graphItem}>
        <VictoryChart>
          <VictoryBar alignment="start" data={graph}></VictoryBar>
        </VictoryChart>
      </div>
    </section>
  );
};

export default UserStatsGraphs;
