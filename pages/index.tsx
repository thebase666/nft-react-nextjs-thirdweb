import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { Router, useRouter } from "next/router";
import { sanityClient, urlFor } from "../sanity"
import { Collection } from "../typings";

interface Props {
  collections: Collection[]
}

const Home = ({ collections }: Props) => {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen px-10 py-20 pt-1 mx-auto font-Poppins max-w-7xl 2xl:px-0">
      <Head>
        <title>Nft Drop React.js</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="font-bold mb-10 text-4xl text-transparent text-center pt-3 bg-clip-text bg-gradient-to-r from-[#f53844] to-[#42378f] font-Poppins">
        NFT Market Place
      </h1>

      <main className="p-10 rounded-lg shadow-xl bg-gradient-to-tl from-rose-600 to-black shadow-rose-400">
        <div className="grid space-x-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {collections.map((collection) => (
            <div
              className="flex flex-col items-center transition-all duration-200 cursor-pointer hover:scale-90"
              onClick={() => router.push(`/nft/${collection.slug.current}`)}
            >
              <img
                className="object-cover h-96 w-60 rounded-2xl"
                src={urlFor(collection.mainImage).url()}
                alt=""
              />

              <div className="p-5">
                <h2 className="text-3xl">{collection.title}</h2>
                <p className="mt-2 text-sm text-gray-400">{collection.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const query = `*[_type == "collection"]{
    _id,
    title,
    address,
    description,
    nftCollectionName,
    mainImage {
      asset
    },
    previewImage {
      asset
    },
    slug {
      current
    },
    creator-> {
      _id,
      name,
      address,
      slug {
        current
      },
    },
  }`

  const collections = await sanityClient.fetch(query)
  // console.log(collections)

  return {
    props: {
      collections
    }
  }
}