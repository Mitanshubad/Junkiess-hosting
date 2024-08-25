import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Skeleton } from "../components/loader";
import ProductCard from "../components/product-card";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import { addToCart } from "../redux/reducer/cartReducer";
import { CartItem } from "../types/types";
import videoCover from "../assets/videos/cover.mp4";
import { FaAnglesDown, FaHeadset } from "react-icons/fa6";
import { motion } from "framer-motion";
import { Slider } from "6pp";
import { TbTruckDelivery } from "react-icons/tb";
import { LuShieldCheck } from "react-icons/lu";


const banners = [
  "https://media.istockphoto.com/id/1437067274/photo/urban-style-women-dancing-outdoors-in-the-city-streets.jpg?s=1024x1024&w=is&k=20&c=PbxqQyzZ3NVSCS32mttE7EAgkKTQxCsU5Jjvtjb2tdk=",
  "https://media.istockphoto.com/id/1350027417/photo/young-adult-dancers-in-the-city-on-a-modern-staircase.jpg?s=1024x1024&w=is&k=20&c=Jycr9ZLSfNit9HQ_Ik_rrj-tDWX93wn7auSEJAE6eIE=",
  "https://media.istockphoto.com/id/1457122831/photo/portrait-of-hip-hop-group-on-staircase-outdoors.jpg?s=1024x1024&w=is&k=20&c=YpHAaysq7qmUWyMTfbG4aF9CX3NRI6d87g7D80kfQrw=",
  "https://img.businessoffashion.com/resizer/v2/2YRLNZFFTJBJ3I6N2AP7Q2ZA64.png?auth=1af2b7e32cdceda83aa3c2534f8e5623a223860257e11278744246168988baae&width=1024"
];
const categories = [
  "CARGO JENS MEN",
  "CARGO JENS WOMEN",
  
  
  "TOP",
  "JENS",
  "T-SHIRT MEN",
  
];

const services = [
  {
    icon: <TbTruckDelivery />,
    title: "FREE AND FAST DELIVERY",
    description: "Free delivery for all orders over $200",
  },
  {
    icon: <LuShieldCheck />,
    title: "SECURE PAYMENT",
    description: "100% secure payment",
  },
  {
    icon: <FaHeadset />,
    title: "24/7 SUPPORT",
    description: "Get support 24/7",
  },
];

const Home = () => {
  const { data, isError, isLoading } = useLatestProductsQuery("");

  const dispatch = useDispatch();

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
  };

  if (isError) toast.error("Cannot Fetch the Products");

  const coverMessage =
    "Fashion isn't just clothes; it's a vibrant language.a conversation starter with every bold print. It's a way to tell our story, a confidence booster. From elegance to rebellion, fashion lets us navigate the world in style.".split(
      " "
    );

  return (
    <>
      <div className="home">
        <section></section>

        <div>
  <aside>
    <h1>Categories</h1> 
    <ul>
      {categories.map((i) => (
        <li key={i}>
          <Link
            to={`/search?category=${i.toLowerCase()}`}
            className="text-black"  // Change category link text color to black
          >
            {i}
          </Link>
        </li>
      ))}
    </ul>
  </aside>
  <Slider
    autoplay
    autoplayDuration={1500}
    showNav={false}
    images={banners}
  />
</div>
        <h1>
          Latest Products
          <Link to="/search" className="findmore">
            More
          </Link>
        </h1>

        <main>
          {isLoading ? (
            <>
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} style={{ height: "25rem" }}>
                  <Skeleton width="18.75rem" length={1} height="20rem" />
                  <Skeleton width="18.75rem" length={2} height="1.95rem" />
                </div>
              ))}
            </>
          ) : (
            data?.products.map((i) => (
              <ProductCard
                key={i._id}
                productId={i._id}
                name={i.name}
                price={i.price}
                stock={i.stock}
                handler={addToCartHandler}
                photos={i.photos}
              />
            ))
          )}
        </main>
      </div>

      <article className="cover-video-container">
        <div className="cover-video-overlay"></div>
        <video autoPlay loop muted src={videoCover} />
        <div className="cover-video-content">
          <motion.h2
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
           JUNKIESS
          </motion.h2>
          {coverMessage.map((el, i) => (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.25,
                delay: i / 10,
              }}
              key={i}
            >
              {el}{" "}
            </motion.span>
          ))}
        </div>
        <motion.span
          animate={{
            y: [0, 10, 0],
            transition: {
              duration: 1,
              repeat: Infinity,
            },
          }}
        >
          <FaAnglesDown />
        </motion.span>
      </article>

      {/* <article className="our-clients">
        <div>
          <h2>Our Clients</h2>
          <div>
            {clients.map((client, i) => (
              <motion.img
                initial={{
                  opacity: 0,
                  x: -10,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  transition: {
                    delay: i / 20,
                    ease: "circIn",
                  },
                }}
                src={client.src}
                alt={client.alt}
                key={i}
              />
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: -100 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: {
                delay: clients.length / 20,
              },
            }}
          >
            Trusted By 100+ Companies in 30+ countries
          </motion.p>
        </div>
      </article> */}

      <hr
        style={{
          backgroundColor: "rgba(0,0,0,0.1)",
          border: "none",
          height: "1px",
        }}
      />

      <article className="our-services">
        <ul>
          {services.map((service, i) => (
            <motion.li
              initial={{ opacity: 0, y: -100 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  delay: i / 20,
                },
              }}
              key={service.title}
            >
              <div>{service.icon}</div>
              <section>
                <h3>{service.title}Y</h3>
                <p>{service.title}</p>
              </section>
            </motion.li>
          ))}
        </ul>
      </article>
    </>
  );
};

export default Home;
