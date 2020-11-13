import { useEffect, useState } from 'react';
import { Col, Container, Navbar, Row } from 'reactstrap';
import { useParams } from 'react-router-dom';
import Hr from '../cssPages&Components/Hr';
import DalApi from '../../dal/DalApi';
import GuildRanking from './GuildRanking';
import LoadingSpinner from '../LoadingSpinner';
import GuildRoster from './GuildRoster';
import Error from '../Error';
import Flag from '../flags/Flag';
import FactionIcons from '../flags/FactionIcons';

const GuildPage = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [guild, setGuild] = useState(null);
  const [raidRankings, setRaidRankings] = useState(null);
  const [raidProgress, setRaidProgress] = useState(null);
  const [roster, setRoster] = useState(null);
  const [flagTag, setFlagTag] = useState(null);
  const [faction, setFaction] = useState(null);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});

  useEffect(() => {
    const getDatas = async () => {
      try {
        const guildRes = await DalApi.getGuild(
          params.region,
          params.realm,
          params.name
        );

        const rosterRes = await DalApi.getGuildRoster(
          params.region,
          params.realm,
          params.name
        );

        const { guildDetails } = guildRes.data;
        setGuild(guildDetails.guild);
        setRaidRankings(guildDetails.raidRankings);
        setRaidProgress(guildDetails.raidProgress);
        setRoster(rosterRes.data.guildRoster.roster);
        setFlagTag(guildDetails.guild.region.slug);
        setFaction(guildDetails.guild.faction);
      } catch (err) {
        setIsError(true);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getDatas();
  }, []);

  if (isError) {
    return <Error msg={error.message} />;
  }

  return (
    <div>
      <Navbar />
      {loading ? (
        <div className="d-flex flex-column align-items-center">
          <div style={{ height: '100px', minWidth: '95vw' }} />
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <div
            style={{ height: '100px', maxWidth: '100%', overflow: 'hidden' }}
          />
          <Container fluid className="w-sm-100 leaderboard-container">
            <Container className="guildPage d-flex flex-column justify-content-center ">
              <Row>
                <Col xs={12}>
                  <h1 className="m-5" style={{ fontSize: '48px' }}>
                    {guild.alt_name ? guild.alt_name : guild.name}
                  </h1>
                </Col>
              </Row>
              <Row className="align-items-center d-flex flex-column flex-sm-row justify-content-center">
                <Col xs={4}>
                  <Flag slug={flagTag} alt={guild.region.name} />
                </Col>
                <Col
                  xs={4}
                  className="font-weight-bold pt-3 h2 sm-p d-flex justify-content-center"
                >
                  {guild.realm.name}
                </Col>
                <Col xs={4}>
                  <FactionIcons faction={faction} />
                </Col>
              </Row>
            </Container>
            <Hr />
            <GuildRanking
              raidRankings={raidRankings}
              raidProgress={raidProgress}
            />
            <Hr />
            <GuildRoster
              roster={roster}
              region={params.region}
              realm={params.realm}
            />
          </Container>
        </>
      )}
    </div>
  );
};

export default GuildPage;
