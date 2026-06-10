export const Spinner = () => (
  <svg
    width={24}
    height={24}
    style={{transform: 'scale(1.1)', margin: '0 auto'}}
    xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z'
      style={{fill: 'oklch(80.9% 0.105 251.813)', opacity: 0.6}}>
      <animateTransform
        attributeName='transform'
        type='rotate'
        dur='1s'
        values='0 12 12;360 12 12'
        repeatCount='indefinite'
      />
    </path>
    <path
      d='M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z'
      style={{fill: 'oklch(54.6% 0.245 262.881)', opacity: 0.7}}>
      <animateTransform
        attributeName='transform'
        type='rotate'
        dur='1s'
        values='-240 12 12;80 12 12'
        repeatCount='indefinite'
      />
    </path>
  </svg>
)
