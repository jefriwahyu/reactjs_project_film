import React, { Component } from "react";
import { Carousel } from "react-responsive-carousel";
import axios from "axios";
import { connect } from "react-redux";
import { Card, Icon, Image, Grid, Header} from "semantic-ui-react";
import ReactPaginate from "react-paginate";

class Beranda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataCarousel: [],
      loading: true,
      dataSchedule: [],
      offset: 0,
      perPage: 9,
      currentPage: 0,
      pageCount: 0,

    };
  }

  //Ambil data top film untuk carousel
  getDataCarousel = async () => {
    try {
      await axios
        .get(`https://api.tvmaze.com/shows`, { crossDomain: true })
        .then((res) => {
          let shorted = res.data.sort(function (a, b) {
            return a.rating.average < b.rating.average
              ? 1
              : b.rating.average < a.rating.average
              ? -1
              : 0;
          });

          let dataRes = shorted.slice(0, 10);
          this.setState({
            dataCarousel: dataRes,
          });
        });
    } catch (error) {
      alert(JSON.stringify(error.message));
    }
  };

  //Ambil data Schedule
  getDataSchedule = async () => {
    try {
      await axios
        .get(`https://api.tvmaze.com/schedule`, { crossDomain: true })
        .then((res) => {
          let dataRes = res.data
          let dataSliced = res.data.slice(this.state.offset, this.state.perPage + this.state.offset);
          this.setState({
            dataSchedule: dataSliced,
            pageCount: Math.ceil(dataRes.length / this.state.perPage ),
            loading: false,
          });
        });
    } catch (error) {
      alert(JSON.stringify(error.message));
    }
  };

  handlePageClick = (e) => {
    console.log('onPageChange', e);
    let selected = e.selected;
    let offset = Math.ceil(selected * this.state.perPage);

    this.setState({ 
        currentPage: selected,
        offset: offset,

    }, () => {
      this.getDataSchedule();
    });
  };

  componentDidMount = async () => {
    await this.getDataCarousel();
    await this.getDataSchedule();
  };

  render() {
    
    return (
      <>
        {this.state.loading ? (
          <h1>Loading....</h1>
        ) : (
          <div>
            <Header size='large'>Top Films</Header>
            <Carousel
              autoPlay
              centerMode
              centerSlidePercentage={40}
              showStatus="false"
            >
              {this.state.dataCarousel.map((data, key) => {
                return (
                  <div key={key}>
                    <img
                      style={{ height: "auto", width: "40%" }}
                      alt={data.name}
                      src={data.image.medium}
                    />
                    <p className="legend">{data.name}</p>
                  </div>
                );
              })}
            </Carousel>

            <Header size='large'>Films Schedule</Header>

            <Grid columns={3} divided>
              {this.state.dataSchedule.map((data, key) => {
                var gambar = {...data.show.image}
                var rating = {...data.show.rating}

                if (gambar === null){
                  gambar = 'https://pixabay.com/id/vectors/seruan-peringatan-tanda-simbol-40026/'
                } else {
                  gambar = gambar.medium
                }

                if (rating.average === null){
                  rating = "0"
                } else {
                  rating = rating.average
                }

                return (
                  
                    <Grid.Column key={key}>
                      <Card>
                        <Image
                          src={gambar}
                          wrapped
                          ui={false}
                        />
                        <Card.Content>
                          <Card.Header>{data.show.name}</Card.Header>
                          <Card.Meta>
                            {data.name}<br />
                            Status : {data.show.status}<br/>
                            Type : {data.show.type}<br />
                            Language : {data.show.language}
                          </Card.Meta>
                          <Card.Description>
                             AirTime : {data.show.schedule.time}
                          </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                          <h5>
                            <Icon name="star" />
                            {rating}
                          </h5>
                        </Card.Content>
                      </Card>
                    </Grid.Column>
                
                );
              })}
              <ReactPaginate
                previousLabel="previous"
                nextLabel="next"
                breakLabel="..."
                breakClassName="break-me"
                pageCount={this.state.pageCount}
                pageRangeDisplayed={4}
                marginPagesDisplayed={2}
                onPageChange={this.handlePageClick}
                containerClassName="pagination"
                subContainerClassName="pages pagination"
                activeClassName="active"
          />
            </Grid>

            
          </div>
        )}
      </>
    );
  }
}

const mapDispatchtoProps = dispatch => {
  return dispatch({
    type: "ACTIVE_ITEM",
    ActiveItem: "detail",
  });
};

export default connect(null, mapDispatchtoProps)(Beranda);
