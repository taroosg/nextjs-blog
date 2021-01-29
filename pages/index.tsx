import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'
import { useState, useEffect } from "react";
import { GetStaticProps } from 'next'

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
  // usestateでデータ確保
  const [data, setData] = useState(null);

  // 自作API叩く関数
  const getDataFromAPI = async (position) => {
    console.log(position)
    const result = await fetch(`../api/hello?lat=${position.coords.latitude}&lon=${position.coords.longitude}`);
    const data = await result.json();
    setData(data);
    return data;
  };

  const showError = () => {
    alert(`oops!`);
    return false;
  };

  const option = {
    enableHighAccuracy: true,
    timeout: 500000000,
    maximumAge: 30000,
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(getDataFromAPI, showError, option);
    // getDataFromAPI();
  }, []);

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
      <section>
        <p>Hi, today is...</p>
        <p>🌤: {data?.weather[0]?.description}</p>
        <p>🔼: {data?.main?.temp_max} ℃</p>
        <p>🌡: {data?.main?.temp} ℃</p>
        <p>🔽: {data?.main?.temp_min} ℃</p>
        <p>🌀: {data?.main?.pressure} hPa</p>
        <p>💧: {data?.main?.humidity} %</p>
        <p>🌬: {data?.wind?.speed} m/s</p>
      </section>
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