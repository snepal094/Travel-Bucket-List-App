const checkMongoIdEquality = (id1, id2) => {
  const isEqualIds = id1.equals(id2);
  return isEqualIds;
};

export default checkMongoIdEquality;
