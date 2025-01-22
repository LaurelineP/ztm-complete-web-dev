import { PureComponent } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

import styles from './ParticlesBackground.module.css'

export class ParticlesBackground extends PureComponent {
  // this customizes the component tsParticles installation
  async customInit(engine) {
    // this adds the bundle to tsParticles
    await loadFull(engine);
  }

  render() {
	return (
		<Particles
            id="tsparticles"
            className={styles.ParticlesBackground}
            init={this.customInit} 
            options={{
                preset: 'triangles',
                background: {
                    color: {
                        value: "#FFF",
                    },
                },
                
                particles: {
                    color: {
                        value: "#000",
                        opacity: 1
                    },
                
                    links: {
                        distance: 150,
                        enable: true,
                        opacity: 0.1,
                        width: 1,
                        triangles: {
                            enable: true,
                            color: "#DEF",
                            opacity: 0.3
                        }
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: false,
                        speed: 3,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 700,
                        },
                        value: 80,
                    },
                    opacity: {
                        value: 0.25,
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 1, max: 3 },
                    },
                    
                },
                detectRetina: true,
            }}
        />
	)
  }
}