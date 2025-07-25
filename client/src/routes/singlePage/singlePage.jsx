import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import { redirect, useLoaderData } from "react-router-dom";
import DOMPurify from "dompurify";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { useState, useContext } from "react";


function SinglePage() {
  const post = useLoaderData();
  const [saved , setSaved] = useState(post.isSaved);

  const {currentUser} = useContext(AuthContext);
const handleSave = async ()=>{
  // AFTER REACT 19 UPDATE TO USEOPTIMISTIK HOOK BUT I AM USING REACT 18 RIGHT NOW

  setSaved((prev)=> !prev);
  if(!currentUser)
  {
    redirect("/login");
  }
  try{

    await apiRequest.post("/users/save" , {postId : post.id});

  }catch(err)
  {
    console.log(err)
    setSaved((prev)=> !prev);

  }
}

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{post.address}</span>
                </div>
                <div className="price">$ {post.price}</div>
              </div>
              <div className="user">
                <img src={post.user.avatar} alt="" />
                <span>{post.user.username}</span>
              </div>
            </div>
            <div className="bottom" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(post.postDetail.desc)}}></div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Utilities</span>
                {
                  post.postDetail.utilities === "owner" ? <p> Owner is responsible</p> : <p> Tenant is responsible</p>
                }
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                {
                  post.postDetail.pet === "allowed" ? <p>Pets allowed</p> : <p>Pets not allowed</p>
                }
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Income Policy</span>
               {post.postDetail.income}
              </div>
            </div>
          </div>
          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>{post.postDetail.size}</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>{post.bedroom}</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>{post.bathroom}</span>
            </div>
          </div>
          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>School</span>
                <p>
                  {post.postDetail.school > 999
                    ? post.postDetail.school / 1000 + "km"
                    : post.postDetail.school + "m"}{" "}
                  away
                </p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>{post.postDetail.bus}</span>
                <p>100m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>{post.postDetail.restaurant}</span>
                <p>200m away</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>
          <div className="buttons">
            <button>
              <img src="/chat.png" alt="" />
              Send a Message
            </button>
            <button onClick={handleSave} style = {{
              backgroundColor : saved ? "#fece51" : "white"
            }}>
              <img src="/save.png" alt="" />
              {saved ? "Place saved" : "Save the Place"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
