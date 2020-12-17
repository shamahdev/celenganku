const Dashboard = {
  async render() {
    return `
        <div class="flex flex-col flex-wrap content-center justify-center">
          <p class="h-24 w-24 p-4 text-center mx-auto">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <g stroke="null">
                <ellipse stroke="#000" ry="4.54353" rx="4.54353" id="svg_2" cy="12" cx="5.51189" stroke-width="0" fill="#FF974B"/>
                <ellipse stroke="#000" ry="4.54353" rx="4.54353" id="svg_3" cy="12" cx="18.48811" stroke-width="0" fill="#FF974B"/>
              </g>
            </svg>
          </p>
          <p class="text-xl text-center leading-8 font-normal tracking-tight text-gray-900 md:text-3xl md:mt-2">
          Mulai Menabung
        </p>
        </div>
      `
  },

  async afterRender() {
    // Write after render here.
  },
}

export default Dashboard
