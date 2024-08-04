import { getData } from './data';

const WonderInfo = async (id) => {
  const dataId = id.searchParams.id;
  const data = await getData(dataId);

  console.log(data);

  return <>{data && <p>{data.wonder.name}</p>}</>;
};

export default WonderInfo;
