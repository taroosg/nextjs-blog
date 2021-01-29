import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'
import { GetStaticProps } from 'next'
import useSWR from 'swr';

// 位置情報取得関数
const fetcher = () => {
  // getCurrentPositionは返り値なしなのでPromiseで実装
  return new Promise((resolve, reject) => {
    const onSuccess = async (position) => {
      const result = await fetch(`../api/hello?lat=${position?.coords?.latitude}&lon=${position?.coords?.longitude}`);
      const data = await result.json();
      resolve(data);
    }
    const options = {
      enableHighAccuracy: true,
      timeout: 60000,
      maximumAge: 30000,
    };
    navigator.geolocation.getCurrentPosition(onSuccess, reject, options);
  });
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

const Home = ({ allPostsData }: {
  allPostsData: {
    date: string
    title: string
    id: string
  }[]
}) => {

  // swrでクライアントからデータ取得してdataに入れる
  // 指定したタイミングでfetcher関数を実行してくれる
  const { data: data } = useSWR("geolocation", fetcher, {
    // 初期データ
    initialData: null,
    // pollingの期間
    refreshInterval: 0,
    // windowのフォーカス時にRevalidateする
    revalidateOnFocus: true,
  });

  // 天気のコンポーネント
  const GetWeather = ({ data }) => {
    return (
      <section>
        <p>Hi, 🌍{data?.name} is...</p>
        <p>🌤: {data?.weather[0]?.description}</p>
        <p>🌡: {data?.main?.temp} ℃</p>
        <p>🌀: {data?.main?.pressure} hPa</p>
        <p>💧: {data?.main?.humidity} %</p>
        <p>🌬: {data?.wind?.speed} m/s</p>
      </section>
    );
  };

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>G's ACADEMY FUKUOKA Chief Lecturer</p>
        {/* <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p> */}
      </section>
      {
        !data
          ? 'loading...'
          : <GetWeather data={data} />
      }
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>))}
        </ul>
      </section>
    </Layout>
  )
}

export default Home;