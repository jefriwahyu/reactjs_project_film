import React, { Component } from "react";
import axios from "axios";
import { Grid, Image, Header, Icon, Card } from "semantic-ui-react";

class Detail extends Component {

  constructor() {
    super();
    this.state = {
      dataDetail: [],
      loading: true,
    };
  }

  // ambil data detail dari TVMaze
  getDataDetail = async () => {
    try {
      
      let id = window.location.pathname.split('/')[2];
      await axios
        .get(`https://api.tvmaze.com/shows/${id}?embed=cast`, {
          crossDomain: true,
        })
        .then((res) => {
          console.log(res.data);
          this.setState({
            dataDetail: res.data,
            loading: false,
          });
        });
    } catch (error) {
      alert(JSON.stringify(error.message));
    }
  };

  componentDidMount = async () => {
    await this.getDataDetail();
  };

  render() {
    console.log(this.state.dataDetail);
    return (
      <>
        {this.state.loading ? (
          <h1>Loading.....</h1>
        ) : (
          <div style={{padding: "20px"}}>
            <Header as="h1">{this.state.dataDetail.name}</Header>
            <Grid key={true}>
              <Grid.Row>
                <Grid.Column width={4} >
                  <Image
                    style={{borderRadius : "15px", boxShadow: "3px 3px 10px 2px"}}
                    alt={this.state.dataDetail.name}
                    src={
                      this.state.dataDetail.image
                        ? this.state.dataDetail.image.original
                        : "https://icon-library.com/images/no-data-icon/no-data-icon-12.jpg"
                    }
                  />
                </Grid.Column>
                <Grid.Column width={9}>
                  <Header as="h2">Description</Header>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: this.state.dataDetail.summary,
                    }}
                  ></div>
                </Grid.Column>
                <Grid.Column width={3}>
                  <Header as="h4">Rating</Header>
                  <div>
                    <Icon name="star" />
                    {this.state.dataDetail.rating.average ? this.state.dataDetail.rating.average : "0"}
                  </div>
                  <Header as="h4">Genre</Header>
                  <div>
                    {" "}
                    {this.state.dataDetail.genres.map((genre, id) => {
                      return <span key={id}>{genre} </span>;
                    })}
                  </div>
                  <Header as="h4">Language</Header>
                  <div>{this.state.dataDetail.language ? this.state.dataDetail.language : "No Data"}</div>
                  <Header as="h4">Status</Header>
                  <div>{this.state.dataDetail.status ? this.state.dataDetail.status : "No Data"}</div>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns={5}>
                
                  {this.state.dataDetail._embedded.cast.map((actor, id)=>{
                    return (
                      <Grid.Column >
                      <Card key={id} style={{padding: "10px"}}>
                      <Image
                        src={actor.person.image ? actor.person.image.medium : 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/User-Pict-Profil.svg/1200px-User-Pict-Profil.svg.png'}
                        wrapped
                        ui={false}
                      />
                      <Card.Content>
                        <Card.Header>{actor.person.name}</Card.Header>
                      </Card.Content>
                    </Card>
                    </Grid.Column>
                      )
                  })}
                  
                
              </Grid.Row>
            </Grid>
          </div>
        )}
      </>
    );
  }
}

export default Detail;
