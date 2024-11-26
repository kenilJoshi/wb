"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
// import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";

export default function Home() {
  // const path = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const userToken = Cookies.get("token");

    if (userToken) {
      setIsAuthenticated(true);
    }
  }, []);

  // const isAuthPage =
  //   path === "/signin" || path === "/signup" || path === "/whiteBoard";

  return (
    <div>
      <div className="flex flex-col items-center justify-start min-h-screen gap-7 pt-48">
        <div className="text-center">
          <h1 className="text-4xl font-bold">
            Online <span className="text-blue-500">WhiteBoard</span> Made Simple
          </h1>

          <h3 className="text-l text-gray-600">
            Ideate, Collaborate, Share. Simply with Excalidraw.
          </h3>
        </div>
        <div className="text-center">
          <svg width="52" height="143" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#e4e4f2"
              d="M25.996 138.422c.162.27 2.264.109 1.94.54-.753.862.488 2.103 1.295 1.295 1.024-1.131 1.885-2.532 2.746-3.717 1.508-2.262 3.069-4.579 4.522-6.895 3.338-5.172 6.568-10.344 9.636-15.677.915-1.671 2.1-3.394 2.691-5.28.215-.647-.27-1.025-.755-1.079.054-.161.107-.215.161-.377.323-.431.593-.808.916-1.239.269-.377.16-.808-.217-1.078-.054-.054-.215-.108-.27-.162-.758-5.282-1.409-10.996-2.06-17.141-.436-5.821-.872-11.966-1.415-18.218-1.578-19.782-3.428-42.205-2.744-64.248a.738.738 0 0 0-.755-.756c-.108 0-.216 0-.27.054 0-.323.054-.593.054-.916 0-.216-.054-.378-.162-.485 0-.108 0-.324-.054-.486 0-.43-.378-.808-.81-.7-.43-.001-.808.376-.7.807 0 .108.055.162 0 .216.001.647-.537 1.185-1.184 1.185-1.348-.055-2.695-.11-3.88-.111l2.478-.214c.431 0 .754-.43.7-.808 0-.43-.432-.755-.809-.701L10.696 4.529c-.216 0-.323.107-.485.269a.69.69 0 0 0-.215.539v.646c-.107 0-.215.108-.269.162a.691.691 0 0 0-.215.539c.137 38.914-.756 69.258-5.476 100.299-.054.27.108.539.27.701-.215.215-.215.539-.107.862 6.801 13.372 15.109 22.972 19.316 27.61l.054.054c.054.054.054.162.108.216a.592.592 0 0 0 .108.216c.486.809 1.348 1.456 2.211 1.78ZM44.822 87.88c.11 1.833.272 3.719.328 5.498-1.789-12.883-3.852-33.366-4.25-59.83.985 18.757 2.239 37.892 3.922 54.332ZM25.195 5.456l-.161.161.161-.161Zm-12.88.475c.107 0 .107 0 .053.054l-.054-.054Zm-1.068 14.983c.055.916.056 1.779.056 2.749 0 0-.054-.054-.107 0 .053-.917.052-1.779.051-2.749Zm-.05 4.366c0 .539.109 1.185.109 1.832v.108c.113 6.468.118 13.043.123 19.727v.108c-.16 1.455-.429 3.125-.643 4.634.263-8.57.364-17.3.41-26.41Zm33.096 74.888c-.543-4.096-1.624-9.163-2.382-13.26-2.381-12.937-4.133-48.619-4.08-49.32.104-5.174.416-20.588.678-30.343v-.647c.593.054 1.078.54 1.025 1.132-1.366 46.567 2.916 79.933 5.299 94.056-.216-.539-.432-.971-.54-1.618Zm-20.375-1.74c3.395-.913 6.36.005 7.655 2.485l.486.809c.108.216.216.539.27.809.378 1.563.326 3.234-.158 4.689-.054.054-.108.108-.108.215.162.054.324.216.485.378.27.378.27.809-.106 1.186-.647.646-3.233 2.045-4.634 2.152-.377.054-.808.053-1.24.053-.592-.054-1.563-.163-2.21-.379-.161.054-.808-.378-1.24-.486-.539-.324-1.132-.701-1.51-1.187 0-.108-.377-.377-.323-.431-.594-.809-1.08-1.726-1.296-2.696 0-.108-.054-.162-.054-.27v-.107a5.546 5.546 0 0 1-.056-2.102c.376-2.102 1.507-3.772 3.284-4.795 0 0 .54-.215.755-.323ZM9.81 115.773c-1.511-2.481-3.022-5.069-4.426-7.873-.054-.054-.108-.215-.216-.215.108-.108.108-.216.162-.378 1.126-7.383 1.983-14.82 2.786-22.311-.372 6.737-.69 13.528-1.225 20.426-.106 2.048.38 4.043 1.568 5.661l2.698 3.775.107.107c.378.917-.915 1.671-1.454.808Z"
            />
            <path
              fill="none"
              stroke="#46464f"
              strokeWidth="2"
              d="M26.58 137.573c.118.015.248.027.403.04l.259.023c.233.022.582.057.858.147.1.032.436.142.665.46a1.088 1.088 0 0 1 .194.792c.48-.594.92-1.233 1.372-1.889.267-.389.54-.783.825-1.177l.638-.956c1.303-1.953 2.62-3.926 3.858-5.9l.007-.011c3.331-5.161 6.55-10.314 9.604-15.624.265-.482.536-.946.802-1.401.684-1.172 1.334-2.284 1.743-3.491l-1.076-.12.39-1.172a2.28 2.28 0 0 1 .133-.316l.002-.004a.418.418 0 0 0 .026-.056v-.002l.052-.154.097-.13c.158-.21.303-.408.451-.611l.001-.001.287-.389a1.215 1.215 0 0 1-.217-.171l-.235-.235-.047-.33c-.566-3.943-1.072-8.122-1.563-12.535.016.333.03.662.04.987l-1.575.133c.443 3.183 2.049 7.285 2.426 9.52v-1c-.032-.08-.202-2.722 0-3 .268-.37.109-1.349 0-2l-1-3 1 2c-.387-2.923-.374-2.774-1-6-.244-1.258-.785-3.838-1-5v-5c-1.203-6.534-.272-13.386-1-24-.365-5.318-.806-12.35-1-16-.097-1.825.048-2.928 0-4-.024-.535.015 1.354 0-3 0-.23-.282-7.858 0-4 .378 5.16-1.262-12.242-1-22V4l-3-2-1.492 3.502 1.092.1c1.024.094 2.023.957 1.933 2.183a601.196 601.196 0 0 0-.208 25.764l1.414-.048c-.407-9.124-.581-18.414-.318-27.646L40.42 6.857l-.002-2.412c0-.17.01-.327.022-.456a2.192 2.192 0 0 1-1.88 1.076h-.02l-.02-.001c-1.353-.055-2.679-.11-3.84-.11l-.065-1.507-23.619 2.06v.476l.001 1.001h-.484c.016 4.763.017 9.398-.003 13.923l1.736-.052c.056.945.057 1.833.057 2.793v.014l.002 2.417-.062-.062.003.034.002.017c.026.307.058.67.058 1.043M26.58 137.573 4 109c-.049 8.814 6.04-65.646 5.786-57.341l.154.013m16.64 85.901-.232-.087c-.688-.258-1.355-.774-1.706-1.359l-.024-.041-.067-.2-.039-.039v-.002a1.156 1.156 0 0 0-.236-.342l-.036-.036c-3.163-3.487-8.627-9.765-14.012-18.329m16.352 20.435-16.352-20.435m2.078-90.027v-.02c-.009-.078-.023-.153-.118-.182l.005-.942-1.751-19.124a.315.315 0 0 0 .05-.09.326.326 0 0 0 .02-.07h-1m2.794 20.428h-.12v.094l.12-.002v.008m0-.1V27.211m0 0v.008h-.12c-.041 6.744-.117 13.29-.27 19.727m.39-19.735c.113 6.474.118 13.055.123 19.733v.002h-.514m0 0-.003.108v.054a702.16 702.16 0 0 1-.127 4.612l-1-.03-.841-.12-.004.093v.009m1.975-4.726h.514v.163l-.006.055c-.118 1.063-.292 2.247-.46 3.38-.065.44-.129.872-.187 1.286l-1.836-.158m0 0c-.524 14.431-1.459 27.993-3.03 41.43m3.549-46.155.455.05v-.05m-.455 0 .727-19.788v.063c-.041 6.746-.117 13.292-.271 19.725m-.456 0h.456m-.456 0h.456m.589-21.67.002.002.002.002-.311-.001h-.204l.51-.003Zm0 0h-.508l.253-.254.255.254ZM6.91 93.102l-.206-.017C6.306 96.8 6 98.45 5.657 100.084l-.151.709a95.076 95.076 0 0 0-1.146 6.239l-.002.015-.006.037v.003l-.27.269a.64.64 0 0 1-.046-.373c4.72-31.041 5.613-61.385 5.476-100.3M6.909 93.103a.07.07 0 0 0 0 .005l-.005.041 3.324 23.99M6.91 93.102l1.787.145c-.185 3.335-.253 4.679-.34 6.021-.09 1.37-.198 2.738-.467 6.218M9.511 6.684l.484-.002h.267l.249-.002m-1 .004c0-.216.054-.377.215-.54.054-.053.161-.16.269-.16l.001-.647v-.05a.678.678 0 0 1 .214-.49c.162-.16.27-.268.485-.268L37.05 2.23c.377-.054.809.27.81.701a.595.595 0 0 1 .005.104l-.573-.022-.131-.005h-.001l-.042-.002h-.022a87.356 87.356 0 0 0-.23-.008L10.511 6.68m0 0v-.005.007-.002Zm-.284 110.458c.421.055.824-.048 1.147-.232.688-.391 1.233-1.305.814-2.322l-.076-.184-.141-.142h-.001v-.001h-.001v-.001h-.001v-.001h-.001v-.001h-.001v-.001h-.001v-.001h-.001v-.001h-.001v-.001h-.001v-.001h-.001v-.001h-.001v-.001h-.001v-.001h-.001v-.001h-.001v-.001h-.001v-.001h-.001v-.001h-.001v-.001h-.001v-.001h-.001v-.001h-.001v-.001h-.001v-.001h-.001v-.001h-.001v-.001h-.001v-.001h-.001v-.001h-.001v-.001h-.001v-.001h-.001v-.001h-.001v-.001h-.001v-.001h-.001v-.001h-.001v-.001h-.001v-.001h-.001v-.001h-.001v-.001h-.001v-.001h-.001v-.001h-.001v-.001h-.001v-.001h-.001v-.001h-.001v-.001h-.001v-.001h-.001v-.001h-.001v-.001h-.001v-.001h-.001v-.001h-.001v-.001h-.001v-.001h-.001v-.001l.04.058.007.009-.058.041-.755.541.707-.708v.002h.001v.001h.001v.001h.001v.001h.001v.001h.001v.001h.001v.001h.001v.001h.001v.001h.001v.001h.001v.001h.001v.001h.001v.001h.001v.001h.001v.001h.001v.001h.001v.001h.001v.001h.001v.001h.001v.001h.001v.001h.001v.001h.001v.001h.001v.001h.001v.001h.001v.001h.001v.001h.001v.001h.001v.001h.001v.001h.001v.001h.001v.001h.001v.001h.001v.001h.001v.001h.001v.001h.001v.001h.001v.001h.001v.001h.001v.001h.001v.001h.001v.001h.001v.001h.001v.001h.001v.001h.001v.001h.001v.001h.001v.001h.001v.001h.001v.001h.001v.001h.001v.001h.001v.001h.001v.001h.001v.001h.001v.001h.001v.001h.001l-2.649-3.707-.007-.01c-1.026-1.398-1.47-3.15-1.376-5.005m0 0 .001-.012-.999-.052.997.077.002-.013Zm2.103-55.284c.183-5.334.31-10.789.395-16.402.035 4.333.038 8.714.042 13.147V47a94.65 94.65 0 0 1-.437 3.203Zm.491-24.927.012-1.612h.703l.1.006.896.052.003-.059c.052-.924.051-1.794.05-2.735v-.014l-1 .001-.738.044-.026 4.317Zm34.314 51.64c-.239-2.758-.467-5.569-.686-8.418l.078.976v.007c.218 2.5.418 4.983.608 7.436ZM23.658 97.464l-.097.026-.09.045a7.975 7.975 0 0 1-.395.173l-.2.082-.062.025-.016.006-.004.002h-.001v.001l-.066.026-.062.035c-2.051 1.18-3.346 3.113-3.77 5.486l-.002.012a6.58 6.58 0 0 0 .042 2.375c0 .159.03.292.054.374v.004l.024.108c.242 1.083.758 2.074 1.362 2.926.06.13.133.222.159.254.043.055.095.109.134.149l.151.194c.508.654 1.262 1.117 1.785 1.43l.127.077.144.036c.09.023.245.096.527.233.111.054.26.126.397.179a1.735 1.735 0 0 0 .4.102c.757.224 1.737.327 2.278.377l.045.004h.08c.397.001.875.001 1.315-.058.898-.078 2.024-.525 2.932-.971.917-.451 1.853-1.022 2.3-1.469.327-.328.554-.748.586-1.234a1.909 1.909 0 0 0-.373-1.24l-.048-.068-.058-.058-.005-.004c.42-1.528.433-3.211.054-4.788a4.535 4.535 0 0 0-.352-1.039l-.017-.035-.02-.033-.47-.784c-1.596-3.02-5.132-3.944-8.788-2.96Zm-4.642 8.753-.002-.008.002.008Zm13.857 1.716-.008.008.008-.008Z"
            />
          </svg>
        </div>
        <div className="text-center">
          <Image
            src="https://res.cloudinary.com/dugadzwcv/image/upload/v1732173441/uhanrqjcwggexui3jomi.png"
            alt="Online WhiteBoard Preview"
            width={1100}
            height={800}
            className="rounded-lg shadow-md"
          />
        </div>
      </div>
      <div className="flex flex-col items-center pt-28 gap-5">
        <div className="text-center">
          <h1 className="text-4xl font-bold">
            Say Hi to <span className="text-blue-500">WhiteBoard</span>
          </h1>
          <h3 className="text-l text-gray-600">SignIn Frist To Draw</h3>
        </div>
        <div className="text-center">
          <Link href={isAuthenticated ? "/Dashboard" : "/signin"}>
            <button className="bg-blue-500 text-white py-2 px-7 rounded-full hover:bg-blue-600 transition duration-300">
              Try Drawing
            </button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col pt-28 items-start justify-center px-80">
        <div className="flex gap-6">
          <div>
            <svg
              width="50"
              height="49"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.016.838c3.518-.627 8.522.204 11.92 1.718 3.398 1.514 6.215 4.41 8.47 7.362 2.255 2.948 4.414 6.775 5.064 10.33.649 3.555-.1 7.458-1.172 11.005-1.067 3.543-2.745 7.622-5.255 10.262-2.51 2.645-6.218 4.57-9.808 5.588-3.59 1.015-8.04 1.147-11.729.516-3.693-.627-7.51-2.081-10.414-4.298s-5.51-5.705-7.007-9.008A22.979 22.979 0 0 1 1.093 23.49c.239-3.71 1.466-8.268 3.422-11.44 1.956-3.172 4.8-5.684 8.318-7.586C16.351 2.564 23.271 1.138 25.626.642c2.354-.495 1.414.428 1.342.851m8.175 1.143c3.315 1.114 6.924 3.918 9.1 6.894 2.175 2.972 3.494 7.223 3.948 10.958.454 3.73-.136 7.829-1.223 11.432-1.092 3.603-2.817 7.57-5.31 10.186-2.49 2.617-6.176 4.518-9.65 5.513-3.47.995-7.486 1.146-11.175.46-3.685-.692-7.94-2.198-10.94-4.59-3-2.393-5.581-6.264-7.051-9.767-1.47-3.5-2.048-7.534-1.777-11.241.27-3.703 1.494-7.933 3.406-10.993 1.916-3.064 4.94-5.573 8.083-7.378C15.698 2.304 19.602.774 23.334.65c3.734-.127 9.718 2.305 11.61 2.697 1.892.387-.12-.607-.25-.364"
                fill="#ECECF4"
              />
              <path
                d="M23.016.838c3.518-.627 8.522.204 11.92 1.718 3.398 1.514 6.215 4.41 8.47 7.362 2.255 2.948 4.414 6.775 5.064 10.33.649 3.555-.1 7.458-1.172 11.005-1.067 3.543-2.745 7.622-5.255 10.262-2.51 2.645-6.218 4.57-9.808 5.588-3.59 1.015-8.04 1.147-11.729.516-3.693-.627-7.51-2.081-10.414-4.298s-5.51-5.705-7.007-9.008A22.979 22.979 0 0 1 1.093 23.49c.239-3.71 1.466-8.268 3.422-11.44 1.956-3.172 4.8-5.684 8.318-7.586C16.351 2.564 23.271 1.138 25.626.642c2.354-.495 1.414.428 1.342.851m8.175 1.143c3.315 1.114 6.924 3.918 9.1 6.894 2.175 2.972 3.494 7.223 3.948 10.958.454 3.73-.136 7.829-1.223 11.432-1.092 3.603-2.817 7.57-5.31 10.186-2.49 2.617-6.176 4.518-9.65 5.513-3.47.995-7.486 1.146-11.175.46-3.685-.692-7.94-2.198-10.94-4.59-3-2.393-5.581-6.264-7.051-9.767-1.47-3.5-2.048-7.534-1.777-11.241.27-3.703 1.494-7.933 3.406-10.993 1.916-3.064 4.94-5.573 8.083-7.378C15.698 2.304 19.602.774 23.334.65c3.734-.127 9.718 2.305 11.61 2.697 1.892.387-.12-.607-.25-.364"
                stroke="#030064"
                strokeLinecap="round"
              />
              <g clipPath="url(#a)">
                <path
                  d="M25.462 16.195c.972-.09 2.013.207 2.932.64.919.432 1.86 1.204 2.584 1.956s1.394 1.608 1.76 2.555c.369.947.472 2.088.444 3.127-.029 1.038-.187 2.163-.611 3.103-.425.94-1.175 1.808-1.934 2.535-.76.728-1.665 1.46-2.62 1.83-.954.372-2.092.432-3.107.396-1.014-.035-2.04-.21-2.98-.61-.941-.401-1.961-1.032-2.663-1.792-.702-.761-1.194-1.776-1.547-2.77-.354-.994-.602-2.156-.574-3.194.027-1.037.328-2.111.738-3.03a7.943 7.943 0 0 1 1.729-2.488c.733-.703 1.538-1.354 2.675-1.732 1.137-.377 3.291-.531 4.145-.532.855 0 .999.369.98.526m-2.887-.597c.931-.217 1.987.19 2.933.514.946.323 1.95.787 2.74 1.427a8.174 8.174 0 0 1 2.004 2.41c.48.9.776 1.959.878 2.982.102 1.023.038 2.164-.265 3.159-.305.995-.89 1.999-1.558 2.811-.667.811-1.55 1.57-2.445 2.058a7.613 7.613 0 0 1-2.925.865c-1.014.092-2.206-.013-3.16-.311-.952-.298-1.788-.82-2.558-1.48-.77-.66-1.546-1.544-2.062-2.48-.515-.937-.938-2.09-1.033-3.14-.095-1.051.125-2.212.46-3.164.334-.951.901-1.745 1.549-2.545.647-.798 1.45-1.733 2.332-2.248.882-.515 2.44-.724 2.964-.842.523-.12.153-.029.174.127"
                  fill="#FFE599"
                />
                <path
                  d="M28.768 36.495c-1.136-.26-5.734-1.104-6.864-1.619-1.128-.515.09-1.038.088-1.47-.002-.433.063-.78-.1-1.122-.163-.343-.425-.532-.877-.934-.453-.401-1.307-.853-1.84-1.475-.533-.622-1.05-1.569-1.357-2.256-.307-.686-.395-1.12-.485-1.867-.092-.749-.173-1.795-.06-2.621.112-.826.434-1.631.733-2.334.299-.703.596-1.362 1.06-1.885.466-.523 1.175-.897 1.731-1.258.557-.36.951-.667 1.607-.908.656-.24 1.503-.513 2.33-.535.825-.023 1.897.182 2.627.4.73.22 1.236.65 1.75.915s.875.343 1.335.677c.46.335 1.054.817 1.43 1.329.375.51.58 1.075.823 1.74.245.665.55 1.563.64 2.248.09.685.003 1.194-.097 1.862-.099.668-.26 1.522-.5 2.148-.239.627-.607 1.147-.935 1.61a6.57 6.57 0 0 1-1.037 1.174c-.438.4-1.132.921-1.59 1.225-.458.305-.685.444-1.162.6-.476.157-1.108.274-1.693.338-.584.064-1.514.047-1.814.05m4.134 3.924c-1.143-.246-5.691-.951-6.803-1.438-1.113-.487.163-1.041.13-1.483-.034-.44-.154-.8-.332-1.163-.177-.363-.34-.596-.734-1.019-.393-.423-1.076-.928-1.628-1.519-.552-.59-1.351-1.338-1.683-2.027-.332-.69-.284-1.36-.309-2.111a12.37 12.37 0 0 1 .16-2.397c.135-.824.378-1.834.656-2.555.278-.72.575-1.254 1.01-1.769.437-.515 1.049-.942 1.605-1.321.557-.38 1.03-.72 1.738-.953.707-.234 1.684-.434 2.505-.449.822-.013 1.717.18 2.423.366.706.184 1.27.472 1.812.74.542.267.958.501 1.437.867.478.366 1.062.818 1.433 1.327.373.51.579 1.087.799 1.727.22.64.428 1.443.522 2.115.093.673.142 1.249.039 1.917-.102.667-.381 1.462-.654 2.091-.273.628-.629 1.161-.985 1.68a10.379 10.379 0 0 1-1.155 1.431c-.416.421-.878.825-1.344 1.092-.467.268-.977.375-1.456.514-.478.14-.835.274-1.417.322-.582.048-1.767-.066-2.073-.034M22.514 36.99c.917.208 4.573 1.006 5.5 1.184m-5.588-1.248c.891.181 4.548.905 5.48 1.112M23.508 39.279c.53.133 2.615.538 3.167.639m-3.282-.684c.562.155 2.915.685 3.481.807"
                  stroke="#030064"
                  strokeLinecap="round"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="m15.512 17.637-3.587-2.04.513-.726 3.16 2.58"
                  fill="#FFE599"
                />
                <path
                  d="M15.48 17.55c-1.18-.855-2.861-1.68-3.5-1.97m3.458 2.012c-.878-.501-1.896-1.124-3.331-1.885m.01-.028c.016-.273.248-.485.354-.965m-.46.889c.232-.266.35-.634.51-.83m-.076.099c.985.497 1.554 1.261 2.958 2.713m-2.974-2.846c1.213 1.082 2.401 1.986 3.109 2.688m.038.022c-.018.034-.03.1-.1.197m.1-.187c-.03.073-.064.14-.085.17"
                  stroke="#030064"
                  strokeLinecap="round"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="m19.53 14.32-1.878-3.263.913-.595.694 4.037"
                  fill="#FFE599"
                />
                <path
                  d="M19.22 14.376c-.23-1.13-.93-2.373-1.682-3.38m1.847 3.466c-.458-1.151-1.202-2.43-1.729-3.43m-.015.072c.356-.28.53-.337.882-.638m-.836.558c.277-.077.465-.25.9-.484m-.12.12c.38 1.347.69 2.85.862 3.903m-.743-3.985c.208.823.23 1.547.792 3.887"
                  stroke="#030064"
                  strokeLinecap="round"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="m24.996 12.915.682-3.843 1.238.124-1.74 3.462"
                  fill="#FFE599"
                />
                <path
                  d="M25.186 12.77c-.032-1.202.207-2.678.212-3.694m-.394 3.912c.098-.798.284-1.632.444-3.94m.194.064c.396-.036.666.131 1.018.1m-1.106-.153c.293-.011.697.168 1.274.235m-.201-.192c-.358 1.447-.667 2.585-1.397 3.507m1.497-3.334c-.64 1.385-1.189 2.85-1.543 3.439m.08.065c-.078.044-.09.08-.192.156m.202-.168a1.602 1.602 0 0 0-.233.134"
                  stroke="#030064"
                  strokeLinecap="round"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="m31.27 14.273 1.932-3.3.986.958-2.956 2.11"
                  fill="#FFE599"
                />
                <path
                  d="M31.213 14.048c.307-.498.818-1.09 1.918-2.836m-2.023 3.05c.775-1.257 1.508-2.278 1.967-3.192m-.05.034c.285.186.56.389.912.687m-.93-.74c.306.31.702.458.984.76m.062-.1c-.738.574-1.287 1.053-2.779 2.663m2.706-2.64c-.803.789-1.635 1.466-2.863 2.574"
                  stroke="#030064"
                  strokeLinecap="round"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="m35.31 18.27 3.41-1.536.455 1.448-3.685.553"
                  fill="#FFE599"
                />
                <path
                  d="M35.32 18.252c1.226-.764 2.534-1.25 3.518-1.612m-3.466 1.576c.805-.29 1.514-.655 3.307-1.489m-.156-.14c.268.625.568.732.734 1.539m-.58-1.386c.196.35.24.674.483 1.317m.063.065c-1.339-.024-2.511.199-3.665.317m3.617-.42c-1.304.158-2.42.303-3.59.63m-.04-.07c-.1-.046-.168-.148-.226-.297m.197.317c-.04-.104-.103-.184-.186-.335"
                  stroke="#030064"
                  strokeLinecap="round"
                />
              </g>
              <defs>
                <clipPath id="a">
                  <path
                    fill="#fff"
                    transform="translate(11.086 8.155)"
                    d="M0 0h29.067v32.779H0z"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div>
            <h1 className="text-4xl font-bold">Create</h1>
            <h3 className="text-l text-gray-600">
              Simply designed to create perfect results fast. Elementary tools,
              advanced features and unlimited options with an infinite canvas.
            </h3>
            <div className="pt-6 pl-5">
              <Image
                src="https://res.cloudinary.com/dugadzwcv/image/upload/v1732173441/uhanrqjcwggexui3jomi.png"
                alt="Online WhiteBoard Preview"
                width={1100}
                height={800}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
        <div className="pt-12 flex gap-6">
          <div>
            <svg
              width="50"
              height="50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.016 1.338c3.518-.627 8.522.204 11.92 1.718 3.398 1.514 6.215 4.41 8.47 7.362 2.255 2.948 4.414 6.775 5.064 10.33.649 3.555-.1 7.458-1.172 11.005-1.067 3.543-2.745 7.622-5.255 10.262-2.51 2.645-6.218 4.57-9.808 5.588-3.59 1.015-8.04 1.147-11.729.516-3.693-.627-7.51-2.081-10.414-4.298s-5.51-5.705-7.007-9.008A22.979 22.979 0 0 1 1.093 23.99c.239-3.71 1.466-8.268 3.422-11.44 1.956-3.172 4.8-5.684 8.318-7.586 3.518-1.901 10.438-3.327 12.793-3.823 2.354-.495 1.414.428 1.342.851m8.175 1.143c3.315 1.114 6.924 3.918 9.1 6.894 2.175 2.972 3.494 7.223 3.948 10.958.454 3.73-.136 7.829-1.223 11.432-1.092 3.603-2.817 7.57-5.31 10.186-2.49 2.617-6.176 4.518-9.65 5.513-3.47.995-7.486 1.146-11.175.46-3.685-.692-7.94-2.198-10.94-4.59-3-2.393-5.581-6.264-7.051-9.767-1.47-3.5-2.048-7.534-1.777-11.241.27-3.703 1.494-7.933 3.406-10.993 1.916-3.064 4.94-5.573 8.083-7.378 3.144-1.806 7.048-3.336 10.78-3.46 3.734-.127 9.718 2.305 11.61 2.697 1.892.387-.12-.607-.25-.364"
                fill="#ECECF4"
              />
              <path
                d="M23.016 1.338c3.518-.627 8.522.204 11.92 1.718 3.398 1.514 6.215 4.41 8.47 7.362 2.255 2.948 4.414 6.775 5.064 10.33.649 3.555-.1 7.458-1.172 11.005-1.067 3.543-2.745 7.622-5.255 10.262-2.51 2.645-6.218 4.57-9.808 5.588-3.59 1.015-8.04 1.147-11.729.516-3.693-.627-7.51-2.081-10.414-4.298s-5.51-5.705-7.007-9.008A22.979 22.979 0 0 1 1.093 23.99c.239-3.71 1.466-8.268 3.422-11.44 1.956-3.172 4.8-5.684 8.318-7.586 3.518-1.901 10.438-3.327 12.793-3.823 2.354-.495 1.414.428 1.342.851m8.175 1.143c3.315 1.114 6.924 3.918 9.1 6.894 2.175 2.972 3.494 7.223 3.948 10.958.454 3.73-.136 7.829-1.223 11.432-1.092 3.603-2.817 7.57-5.31 10.186-2.49 2.617-6.176 4.518-9.65 5.513-3.47.995-7.486 1.146-11.175.46-3.685-.692-7.94-2.198-10.94-4.59-3-2.393-5.581-6.264-7.051-9.767-1.47-3.5-2.048-7.534-1.777-11.241.27-3.703 1.494-7.933 3.406-10.993 1.916-3.064 4.94-5.573 8.083-7.378 3.144-1.806 7.048-3.336 10.78-3.46 3.734-.127 9.718 2.305 11.61 2.697 1.892.387-.12-.607-.25-.364"
                stroke="#030064"
                strokeLinecap="round"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.56 20.206c-.76.878-3.296 8.032-4.442 6.348-1.145-1.687-4.567-15.113-2.43-16.458 2.135-1.344 14.2 6.597 15.244 8.39 1.044 1.794-7.617 2.03-8.982 2.366"
                fill="#FFBC85"
              />
              <path
                d="M16.953 21c-.728.956-3.307 7.568-4.3 5.742-.99-1.827-3.977-15.362-1.65-16.705 2.325-1.344 14.596 6.854 15.604 8.645 1.008 1.79-7.997 1.801-9.557 2.099m.33.07c-.623.846-3.09 7.178-4.195 5.42-1.102-1.756-4.684-14.614-2.426-15.962 2.255-1.346 14.84 6.119 15.968 7.882 1.127 1.76-7.684 2.228-9.201 2.694"
                stroke="#46464F"
                strokeLinecap="round"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M31.157 31.79c.761.878 3.297 8.032 4.442 6.348 1.146-1.687 4.568-15.113 2.432-16.458-2.136-1.344-14.201 6.597-15.245 8.39-1.044 1.794 7.617 2.03 8.982 2.366"
                fill="#FFBC85"
              />
              <path
                d="M31.766 32.583c.728.957 3.307 7.57 4.3 5.743.99-1.827 3.976-15.362 1.65-16.705-2.325-1.344-14.596 6.854-15.604 8.645-1.008 1.79 7.996 1.801 9.557 2.099m-.33.07c.623.846 3.09 7.178 4.195 5.42 1.102-1.755 4.684-14.614 2.426-15.962-2.256-1.346-14.84 6.119-15.968 7.882-1.128 1.76 7.684 2.228 9.201 2.694"
                stroke="#46464F"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-4xl font-bold">Collaborate</h1>
            <h3 className="text-l text-gray-600">
              Send link, get feedback and finish the idea together.
            </h3>
            <div className="pt-6 pl-5">
              <Image
                src="https://res.cloudinary.com/dugadzwcv/image/upload/v1732179968/Screenshot_from_2024-11-21_14-35-56_qmspud.png"
                alt="Online WhiteBoard Preview"
                width={1100}
                height={800}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-10">
        <div className="border-2 border-green-200"></div>
      </div>

      <div className="flex flex-col items-center pt-28 gap-5">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Free</h1>
          <div className="w-[34rem]">
            <h3 className="text-md text-gray-600 p-4">
              Don’t take our word for granted. Try the forever free WhiteBoard
               editor for yourself and get your ideas out there.
            </h3>
          </div>
        </div>
        <div className="text-center">
          <Link href={isAuthenticated ? "/Dashboard" : "/signin"}>
            <button className="bg-blue-500 text-white py-2 px-7 rounded-full hover:bg-blue-600 transition duration-300">
              Draw
            </button>
          </Link>
        </div>
      </div>

      <div className="pt-28">
      <footer className="bg-blue-950 text-white py-4">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </div>
    </footer>
    </div>
    </div>
  );
}