import path from "path";
import fs from "fs/promises";
import { Fragment } from "react";

const ProductDetailPage = (props) => {
  const { loadedProduct } = props;
  if (!loadedProduct) {
    return <p>Loading...</p>;
  }
  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
};

async function getData() {
  const filePath = path.join(process.cwd(), "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return data;
}

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;
  const data = await getData();
  const product = data.products.find((product) => product.id === productId);
  if (!product) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      loadedProduct: product,
    },
  };
}

//to tell next.js whitch instances should be pre-generated
export async function getStaticPaths() {
  const data = await getData();
  const ids = data.products.map((product) => product.id);
  const pathWithParams = ids.map((id) => ({ params: { pid: id } }));
  return {
    paths: pathWithParams,
    //setting "fallback" option to "true", you only pre-generate pages above and other pages will not be pre-generated
    //comment out pid 3 product,still it is generated but not pre-generated. it will be generated after data is fetched.
    // so,if you access this "p3" page directly typing URL to your browser, you should show loading page or some kind, like a normal React App.
    fallback: true,
    //Or you can set "blocking" option to "fallback".it blocks showing pages whitch are not with fetched data.Then you dont need any Loading message or anything.
  };
}

export default ProductDetailPage;
