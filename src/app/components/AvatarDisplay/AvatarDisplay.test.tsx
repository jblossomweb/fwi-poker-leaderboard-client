import forEach from 'lodash/forEach'
import Avatar from 'react-avatar'
import { mountScenarios, getTestScenes } from 'core/test/scenarios.utils'
import { scenarios } from './AvatarDisplay.test.story'
import AvatarDisplay from './AvatarDisplay'

const scenes = getTestScenes(
  mountScenarios(scenarios),
  AvatarDisplay,
  component => ({
    Avatar: component.find(Avatar),
}))

describe('components/AvatarDisplay', () => {
  it(`always mounts the AvatarDisplay component`, () => {
    forEach(scenes, scene => {
      expect(scene.component.length).toBe(1)
    })
  })
  it(`always mounts an Avatar component`, () => {
    forEach(scenes, scene => {
      expect(scene.elements.Avatar.length).toBe(1)
    })
  })
  it(`always mounts a round Avatar component`, () => {
    forEach(scenes, scene => {
      const avatarProps = scene.elements.Avatar.props()
      expect(avatarProps.round).toBe(true)
    })
  })
  it(`always passes player.name to Avatar as 'name'`, () => {
    forEach(scenes, scene => {
      const avatarProps = scene.elements.Avatar.props()
      expect(avatarProps.name).toEqual(scene.props.player.name)
    })
  })
  it(`passes player.email to Avatar as 'email' when provided`, () => {
    forEach(scenes, scene => {
      if (scene.props.player.email) {
        const avatarProps = scene.elements.Avatar.props()
        expect(avatarProps.email).toEqual(scene.props.player.email)
      }
    })
  })
  it(`passes player.twitterHandle to Avatar as 'twitterHandle' when provided`, () => {
    forEach(scenes, scene => {
      if (scene.props.player.twitterHandle) {
        const avatarProps = scene.elements.Avatar.props()
        expect(avatarProps.twitterHandle).toEqual(scene.props.player.twitterHandle)
      }
    })
  })
})
