import React, { useState, useEffect } from "react";
import axios from "axios";
import heroImage from "./image.png";

const Home = () => {
  const [conferences, setConferences] = useState([]);
  const [sponsors, setSponsors] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const confRes = await axios.get("http://localhost:5000/api/conferences");
        const sponsorRes = await axios.get("http://localhost:5000/api/sponsors");
        const postRes = await axios.get("http://localhost:5000/api/posts");

        setConferences(confRes.data);
        setSponsors(sponsorRes.data);
        setPosts(postRes.data);
      } catch (err) {
        console.error("Error fetching data:", err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* HERO SECTION - Pjesa hyrëse me foto dhe përshkrim */}
      <section
  id="hero"
  style={{
    backgroundImage: `url(${heroImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100vh", // Use full viewport height
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    textShadow: "0 2px 5px rgba(0, 0, 0, 0.7)",
    padding: "0 20px", // Ensure some padding for smaller screens
  }}
>
  <h1 style={{ fontSize: "4rem", fontWeight: "700" }}>Mirësevini në Platformën tonë</h1>
  <p style={{ fontSize: "1.5rem", fontWeight: "400", maxWidth: "700px", textAlign: "center" }}>
    Organizoni konferenca dhe menaxhoni sponsorë me lehtësi!
  </p>
  <a href="/menu" className="btn btn-warning btn-lg mt-3">Shiko më shumë</a>

</section>

      {/* MAIN CONTENT */}
      <div className="container py-5">
        {/* Konferencat */}
        <section id="conferences" className="mb-5">
          <h2 className="text-center mb-4">Konferencat</h2>
          <div className="row">
            {conferences.length > 0 ? (
              conferences.map((conference) => (
                <div key={conference.id} className="col-md-4 mb-3">
                  <div className="card shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title">{conference.name}</h5>
                      <p className="card-text">{conference.description}</p>
                      <button className="btn btn-sm btn-primary">Edito</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">Nuk ka konferenca për momentin.</p>
            )}
          </div>
        </section>

        {/* Sponsorët */}
        <section id="sponsors" className="mb-5">
          <h2 className="text-center mb-4">Sponsorët</h2>
          <div className="row">
            {sponsors.length > 0 ? (
              sponsors.map((sponsor) => (
                <div key={sponsor.id} className="col-md-3 mb-3">
                  <div className="card shadow-sm text-center">
                    <div className="card-body">
                      <img
                        src="https://via.placeholder.com/150"
                        alt={sponsor.name}
                        className="img-fluid rounded-circle my-3"
                      />
                      <h5 className="card-title">{sponsor.name}</h5>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">Nuk ka sponsorë për momentin.</p>
            )}
          </div>
        </section>

        {/* Postimet */}
        <section id="posts">
          <h2 className="text-center mb-4">Postimet</h2>
          <div className="row">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.id} className="col-md-6 mb-3">
                  <div className="card shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title">{post.title}</h5>
                      <p className="card-text">{post.content}</p>
                      <button className="btn btn-sm btn-primary">Edito</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">Nuk ka postime për momentin.</p>
            )}
          </div>
        </section>
      </div>

      {/* FOOTER - Fundi i faqes */}
      {/* <footer className="footer bg-dark text-white">
  <div className="container text-center py-4">
    <p>&copy; 2024 KonferencaApp. Të gjitha të drejtat e rezervuara.</p>
    <p>
      Na ndiqni në{" "}
      <a href="#" className="text-warning mx-2">
        <i className="fab fa-facebook"></i> Facebook
      </a>
      <a href="#" className="text-warning mx-2">
        <i className="fab fa-instagram"></i> Instagram
      </a>
      dhe{" "}
      <a href="#" className="text-warning mx-2">
        <i className="fab fa-linkedin"></i> LinkedIn
      </a>
    </p>
  </div>
</footer> */}
    </div>
  );
};

export default Home;
