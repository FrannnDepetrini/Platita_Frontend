import React, { useEffect, useState } from "react";
import styles from "./Reputation.module.css";

import {
  IoIosStar,
  IoIosStarHalf,
  IoIosStarOutline,
} from "../../utils/icons/icons";

const Reputation = ({ role, reputationData }) => {
  const [averages, setAverages] = useState({});
  const [averageScore, setAverageScore] = useState(0);

  useEffect(() => {
    var totalReviews = 0;
    var acumReputation = 0;
    var newAverages = {};

    Object.entries(reputationData).forEach((rep) => {
      totalReviews += rep[1];
      acumReputation += parseInt(rep[0]) * rep[1];
    });

    Object.entries(reputationData).forEach(([score, count]) => {
      newAverages[score] = (count / totalReviews) * 100;
    });

    setAverages(newAverages);
    var totalAverage = parseFloat(acumReputation / totalReviews).toFixed(2);

    if (parseInt(totalAverage.toString()[2]) >= 5) {
      totalAverage = parseFloat(totalAverage.toString().split(".")[0] + ".5");
      console.log(parseFloat(totalAverage).toFixed(1));
    } else {
      totalAverage = parseInt(totalAverage);
    }
    setAverageScore(totalAverage);
  }, []);

  const starsCalculated = (average) => {
    var stars = [];
    for (var i = 1; i < 6; i++) {
      if (average >= i) {
        stars.push(<IoIosStar className={styles.star} />);
      } else if (average >= i - 0.5) {
        stars.push(<IoIosStarHalf className={styles.star} />);
      } else {
        stars.push(<IoIosStarOutline className={styles.star} />);
      }
    }

    return stars;
  };

  const fiveStars = {
    width: `${averages[5]}%`,
  };

  const fourStars = {
    width: `${averages[4]}%`,
  };

  const threeStars = {
    width: `${averages[3]}%`,
  };

  const twoStars = {
    width: `${averages[2]}%`,
  };

  const oneStar = {
    width: `${averages[1]}%`,
  };

  console.log(averages);
  return (
    <div className={styles.reputationContainer}>
      <div className={styles.averageReputationContainer}>
        <h3>Reputacion como {role}</h3>
        <div className={styles.averageAndStars_container}>
          <h2>{averageScore}</h2>
          <div className={styles.stars_container}>
            {starsCalculated(averageScore)}
          </div>
        </div>
      </div>
      <div className={styles.averages_list}>
        <div className={styles.average_container}>
          <h3>5 Estrellas</h3>
          <div className={styles.average}>
            <div style={fiveStars} className={styles.fill}></div>
          </div>
          <h4>{reputationData[5]}</h4>
        </div>
        <div className={styles.average_container}>
          <h3>4 Estrellas</h3>
          <div className={styles.average}>
            <div style={fourStars} className={styles.fill}></div>
          </div>
          <h4>{reputationData[4]}</h4>
        </div>
        <div className={styles.average_container}>
          <h3>3 Estrellas</h3>
          <div className={styles.average}>
            <div style={threeStars} className={styles.fill}></div>
          </div>
          <h4>{reputationData[3]}</h4>
        </div>
        <div className={styles.average_container}>
          <h3>2 Estrellas</h3>
          <div className={styles.average}>
            <div style={twoStars} className={styles.fill}></div>
          </div>
          <h4>{reputationData[2]}</h4>
        </div>
        <div className={styles.average_container}>
          <h3>1 Estrella</h3>
          <div className={styles.average}>
            <div style={oneStar} className={styles.fill}></div>
          </div>
          <h4>{reputationData[1]}</h4>
        </div>
      </div>
    </div>
  );
};

export default Reputation;
