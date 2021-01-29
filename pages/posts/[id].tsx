import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { GetStaticProps, GetStaticPaths } from 'next'

const Post = ({ postData }: {
  postData: {
    title: string
    date: string
    contentHtml: string
  }
}) => {

  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
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


export const getStaticPaths: GetStaticPaths = async () => {
  // id としてとりうる値のリストを返す
  const paths = getAllPostIds()
  return {
    paths: [],
    // ISRする．リクエスト毎にビルドして，完了したらデータを返す
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // params.id を使用して、ブログの投稿に必要なデータを取得する
  const postData = await getPostData(params.id as string)
  return {
    props: {
      postData
    },
    revalidate: 60,
  }
}

export default Post;