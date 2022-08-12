import React, { Component } from "react";
import { Grid, Image, Header, Card, Icon, Input } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import axios from "axios";

class Film extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataFilm: [],
      loading: true,
    };
  }

  // ambil data film dari TVMaze
  getDataFilm = async () => {
    try {
      await axios
        .get(`https://api.tvmaze.com/search/shows?q=marvel`, {
          crossDomain: true,
        })
        .then((res) => {
          console.log(res.data);
          let dataRes = res.data;
          this.setState({
            dataFilm: dataRes,
            loading: false,
          });
        });
    } catch (error) {
      alert(JSON.stringify(error.message));
    }
  };

  getDataSearch = async (e) => {
    if (e.target.value === "") {
      this.getDataFilm()
    } else {
    try {
      await axios
        .get(`https://api.tvmaze.com/search/shows?q=${e.target.value}`, {
          crossDomain: true,
        })
        .then((res) => {
          console.log(res.data);
          let dataRes = res.data;
          this.setState({
            dataFilm: dataRes,
            
          });
        });
    } catch (error) {
      alert(JSON.stringify(error.message));
    }}
  };


  componentDidMount = async () => {
    await this.getDataFilm();
  };

  render() {
    return (
      <>
        <Header size="large">Database Films</Header>

        <Grid celled="internally">
          <Grid.Row>
            <Grid.Column width={2}>
              <Image src="https://img1.ak.crunchyroll.com/i/spire2/d83ad13e5c1f21e2c8980d84be138b821616778814_main.png" />
              <Image
                style={{ marginTop: 20 }}
                src="https://img1.ak.crunchyroll.com/i/spire2/d83ad13e5c1f21e2c8980d84be138b821616778814_main.png"
              />
              <Image
                style={{ marginTop: 20 }}
                src="https://img1.ak.crunchyroll.com/i/spire2/d83ad13e5c1f21e2c8980d84be138b821616778814_main.png"
              />
            </Grid.Column>
            <Grid.Column width={10}>
              <div style={{marginBottom: 20}}>
                {" "}
                <Input icon="search" placeholder="Search Movie..." onChange={(e) => {this.getDataSearch(e)}}/>
              </div>
              {/* Card data Film */}
              <Grid columns={3} divided>
                {this.state.dataFilm.map((data, key) => {
                  var gambar = { ...data.show.image };
                  var rating = { ...data.show.rating };

                  if (data.show.image === null) {
                    gambar =
                      "https://www.monitorteknologi.com/wp-content/uploads/2019/08/8-Kode-HTTP-Error-Paling-Umum-Dengan-Artinya.jpg";
                  } else {
                    gambar = gambar.medium;
                  }

                  if (rating.average === null) {
                    rating = "0";
                  } else {
                    rating = rating.average;
                  }

                  return (
                    <Grid.Column key={key}>
                      <Link to={`/Detail/${data.show.id}`}>
                      <Card>
                        <Image src={gambar} wrapped ui={false} />
                        <Card.Content>
                          <Card.Header>{data.show.name}</Card.Header>
                          <Card.Meta>
                            {data.name}
                            <br />
                            Status : {data.show.status}
                            <br />
                            Type : {data.show.type}
                            <br />
                            Language : {data.show.language}
                          </Card.Meta>
                          <Card.Description>
                            Description :{" "}
                            <div
                              dangerouslySetInnerHTML={{
                                __html: data.show.summary,
                              }}
                            ></div>
                          </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                          <h5>
                            <Icon name="star" />
                            {rating}
                          </h5>
                        </Card.Content>
                      </Card>
                      </Link>
                    </Grid.Column>
                  );
                })}
              </Grid>
            </Grid.Column>
            <Grid.Column width={3}>
              <Image src="https://img1.ak.crunchyroll.com/i/spire2/d83ad13e5c1f21e2c8980d84be138b821616778814_main.png" />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    );
  }
}

const mapDispatchtoProps = (dispatch) => {
  return dispatch({
    type: "ACTIVE_ITEM",
    ActiveItem: "film",
  });
};

export default connect(null, mapDispatchtoProps)(Film);
