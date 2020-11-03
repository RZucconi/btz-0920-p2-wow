import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Col, Table, Container } from 'reactstrap';
import DalApi from '../dal/DalApi';
import LoadingSpinner from './LoadingSpinner';
import EuroFlag from './flags/EuroFlag';
import ChinaFlag from './flags/ChinaFlag';
import UsFlag from './flags/UsFlag';

import './cssPages&Components/test.css';

const PlayerProfile = ({ match }) => {
  const [playerRegion, setPlayerRegion] = useState('');
  const [playerRealm, setPlayerRealm] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [charClass, setCharClass] = useState('');
  const [specName, setSpecName] = useState('');
  const [specRole, setSpecRole] = useState('');
  const [guild, setGuild] = useState('');
  const [itemLevel, setItemLevel] = useState(0);
  const [raidScore, setRaidScore] = useState('');
  const [mythicScore, setMythicScore] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    DalApi.getPlayer(
      (data) => {
        setPlayerRegion(data.region);
        setPlayerRealm(data.realm);
        setPlayerName(data.name);
        setThumbnail(data.thumbnail_url);
        setCharClass(data.class);
        setSpecName(data.active_spec_name);
        setSpecRole(data.active_spec_role);
        setGuild(data.guild.name);
        setItemLevel(data.gear.item_level_equipped);
        setRaidScore(data.raid_progression['nyalotha-the-waking-city'].summary);
        setMythicScore(data.mythic_plus_scores_by_season[0].scores.all);
        setLoading(false);
      },
      match.params.region,
      match.params.realm,
      match.params.name
    );
  }, []);

  const displaysFlag = (reg) => {
    switch (reg) {
      case 'eu':
        return <EuroFlag />;
      case 'de':
        return <EuroFlag />;
      case 'us':
        return <UsFlag />;
      case 'China':
        return <ChinaFlag />;
      case 'Russian':
        return <EuroFlag />;
      default:
        return 'error';
    }
  };

  const displaysSpecRole = (playerSpecRole) => {
    switch (playerSpecRole) {
      case 'DPS':
        return 'https://external-preview.redd.it/S38BJlfOcffd02QmOfbhABLi-J9C_FsRDkPcf66F_d4.png?auto=webp&s=8422980d40b8218136652c9ecbc53aa94b38128c';
      case 'TANK':
        return 'https://i.pinimg.com/236x/6a/2e/da/6a2edae61362537b8558c9007d92a3b6.jpg';
      case 'HEALING':
        return 'https://i.pinimg.com/736x/86/bf/ea/86bfea90a098cafd1e185429a73e3a6f.jpg';
      default:
        return 'error';
    }
  };

  const displaysClass = (playerClass) => {
    switch (playerClass) {
      case 'Death Knight':
        return DalApi.getClassesAndSpecs()[0].image;
      case 'Demon Hunter':
        return DalApi.getClassesAndSpecs()[1].image;
      case 'Druid':
        return DalApi.getClassesAndSpecs()[2].image;
      case 'Hunter':
        return DalApi.getClassesAndSpecs()[3].image;
      case 'Mage':
        return DalApi.getClassesAndSpecs()[4].image;
      case 'Monk':
        return DalApi.getClassesAndSpecs()[5].image;
      case 'Paladin':
        return DalApi.getClassesAndSpecs()[6].image;
      case 'Priest':
        return DalApi.getClassesAndSpecs()[7].image;
      case 'Rogue':
        return DalApi.getClassesAndSpecs()[8].image;
      case 'Shaman':
        return DalApi.getClassesAndSpecs()[9].image;
      case 'Warlock':
        return DalApi.getClassesAndSpecs()[10].image;
      case 'Warrior':
        return DalApi.getClassesAndSpecs()[11].image;
      default:
        return 'error';
    }
  };

  return (
    <Container fluid className="w-50">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="test">
          <Container className="d-flex justify-content-center flex-wrap">
            <Col xs={3}>
              <img src={thumbnail} alt="" />
            </Col>
            <div className="d-flex flex-column">
              <Col xs={6}>
                <h1>{playerName}</h1>
              </Col>
              <div className="d-flex">
                <Col xs="3">{displaysFlag(playerRegion)}</Col>
                <Col>
                  <h3>{playerRealm}</h3>
                </Col>
              </div>
            </div>
          </Container>
          <Table striped>
            <tbody>
              <tr>
                <td>
                  <img
                    src={displaysClass(charClass)}
                    alt=""
                    height="64px"
                    width="64px"
                  />
                </td>

                <td>
                  <h4>{specName}</h4>
                </td>
                <td>
                  <img src={displaysSpecRole(specRole)} alt="" height="64px" />
                </td>
              </tr>
              <tr>
                <td xs={3}>
                  <h4>Guild</h4>
                </td>
                <td xs={9}>
                  <h4>{guild}</h4>
                </td>
              </tr>
              <tr>
                <td xs={3}>
                  <h4>Item level</h4>
                </td>
                <td>
                  <h4>{itemLevel}</h4>
                </td>
                <td />
              </tr>
              <tr>
                <td xs={9}>
                  <h4>Current raid score</h4>
                </td>
                <td xs={3}>
                  <h4>{raidScore}</h4>
                </td>
              </tr>
              <tr>
                <td xs={9}>
                  <h4>Current mythic score</h4>
                </td>
                <td xs={3}>
                  <h4>{mythicScore}</h4>
                </td>
                <td />
              </tr>
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
};

PlayerProfile.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string.isRequired,
      realm: PropTypes.string.isRequired,
      region: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default PlayerProfile;