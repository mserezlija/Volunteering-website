const Home: React.FC = () => {
  return (
    <div className="container mt-5">
      <div className="jumbotron">
        <h1 className="display-4">Welcome to our Volunteering Application!</h1>
        <p className="lead">
          Here you can find volunteering activities, volunteers, and
          organizations.
        </p>
        <hr className="my-4" />
        <p>Feel free to explore and get involved!</p>
        <p className="lead">
          <a className="btn btn-primary btn-lg" href="#" role="button">
            Learn more
          </a>
        </p>
      </div>
    </div>
  );
};

export default Home;
