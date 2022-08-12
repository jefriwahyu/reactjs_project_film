import React, { Component } from "react";
import { Carousel } from "react-responsive-carousel";
import axios from "axios";
import { connect } from "react-redux";
import { Card, Image, Grid, Input } from "semantic-ui-react";

class Actor extends Component {
  constructor() {
    super();
    this.state = {
      dataActor: [],
      loading: true,
    };
  }

  getDataActor = async () => {
    try {
      await axios
        .get("https://api.tvmaze.com/search/people?q=jeffrey", {
          crossDomain: true,
        })
        .then((res) => {
          this.setState({
            dataActor: res.data,
            loading: false,
          });
        });
    } catch (error) {
      alert(JSON.stringify(error.message));
    }
  };

  getDataSearch = async (e) => {
    if (e.target.value === "") {
      this.getDataActor()
    } else {
    try {
      await axios
        .get(`https://api.tvmaze.com/search/people?q=${e.target.value}`, {
          crossDomain: true,
        })
        .then((res) => {
          console.log(res.data);
          this.setState({
            dataActor: res.data,
            loading : false
          });
        });
    } catch (error) {
      alert(JSON.stringify(error.message));
    }}
  };

  componentDidMount = () => {
    this.getDataActor();
    this.getDataSearch();
  };

  
  render() {
    console.log(this.state.dataActor);
    return (
      <>
      {this.state.loading ? <h2>Loading...</h2> : (
        <div>
          <Carousel
            autoPlay
            centerMode
            centerSlidePercentage={40}
            showStatus={false}
          >
            {this.state.dataActor.map((data, key) => {
              var gambar = { ...data.person.image };

              if (data.person.image === null) {
                gambar =
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/User-Pict-Profil.svg/1200px-User-Pict-Profil.svg.png";
              } else {
                gambar = gambar.original;
              }
              return (
                <div key={key}>
                  <img
                    style={{ height: "auto", width: "50%" }}
                    alt={data.person.name}
                    src={gambar}
                  />
                  <p className="legend">{data.person.name}</p>
                </div>
              );
            })}
          </Carousel>
        </div>
        )}
        
        <Grid style={{marginTop: 20}} celled>
            <Grid.Column width={4}>
                <Image alt="IKLAN" src="https://cdn1-production-images-kly.akamaized.net/ccBSE9kHKzik7wBR3i1ws9mIp9A=/0x0:1080x1080/640x640/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/3963435/original/003712400_1647339337-WhatsApp_Image_2022-03-15_at_2.53.41_PM.jpeg" />
            </Grid.Column>
            <Grid.Column width={12}>
            <Input size="big" style={{marginBottom: 20}} icon='users' iconPosition='left' placeholder='Search Actor...' onChange={(e) => {this.getDataSearch(e)}}/>
          <Card.Group>
            
                {this.state.dataActor.map((data,key)=> {
                    var gambar = {...data.person.image};
                    var negara = {...data.person.country};

                    // if(data.person.image === null){
                    //     gambar = 'https://www.monitorteknologi.com/wp-content/uploads/2019/08/8-Kode-HTTP-Error-Paling-Umum-Dengan-Artinya.jpg'
                    // } else {
                    //     gambar = gambar.original
                    // }

                    // if(data.person.country === null){
                    //     negara = 'Not Updated'
                    // } else {
                    //     negara = negara.name
                    // }
                    return (
                        <Card>
                        <Card.Content>
                        <Image
                          floated="left"
                          size="mini"
                          src={gambar.original ? gambar.original : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/User-Pict-Profil.svg/1200px-User-Pict-Profil.svg.png"}
                        />
                        <Card.Header>{data.person.name}</Card.Header>
                        <Card.Meta>{negara.name ? negara.name : "No Data"}<br/>
                          {data.person.gender ? data.person.gender : "No Data"}
                        </Card.Meta>
                        <Card.Description>
                          <a href={data.person.url}><strong>Link Bio</strong> </a>
                        </Card.Description>
                      </Card.Content>
                      </Card>
                    )
                })}
            
          </Card.Group>
          </Grid.Column>
        </Grid>
      </>
    );
  }
}

const mapDispatchtoProps = (dispatch) => {
  return dispatch({
    type: "ACTIVE_ITEM",
    ActiveItem: "actor",
  });
};

export default connect(null, mapDispatchtoProps)(Actor);
