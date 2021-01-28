import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { useState, useEffect } from "react";


const Post = ({ postData }) => {

  // usestateでデータ確保
  const [data, setData] = useState(null);

  // 自作API叩く関数
  const getDataFromAPI = async () => {
    const result = await fetch(`../api/hello`);
    const data = await result.json();
    setData(data);
    return data;
  }

  useEffect(() => {
    getDataFromAPI();
  }, []);

  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <p>{data?.text}</p>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}


export const getStaticPaths = async () => {
  // id としてとりうる値のリストを返す
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async ({ params }) => {
  // params.id を使用して、ブログの投稿に必要なデータを取得する
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}

export default Post;