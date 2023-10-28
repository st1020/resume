import subprocess
import sys
from pathlib import Path


def build() -> None:
    _build(True)


def _build(minify: bool = False) -> None:
    from renderer._core import ResumeRenderer

    renderer = ResumeRenderer(minify=minify)
    renderer.render()
    if minify:
        print("called", minify)
        subprocess.run(
            [
                "tailwindcss",
                "-m",
                "-i",
                "public/css/style.css",
                "-o",
                "output/css/style.css",
            ],
            check=True,
        )


def copy_assets(filenames: str | None = None) -> None:
    for filename in filenames or []:
        if filename == "public/css/style.css":
            continue
        print(f"\x1b[32mCopying\x1b[0m {filename} ...")
        target_file = Path("output") / Path(filename).relative_to("public")
        target_file.parent.mkdir(exist_ok=True, parents=True)
        target_file.write_bytes(Path(filename).read_bytes())


def livereload() -> None:
    _build()
    try:
        import livereload
    except ModuleNotFoundError:
        print("\x1b[31mError\x1b[0m: livereload is not installed.", file=sys.stderr)
        return
    server = livereload.Server()
    server.watch("templates/**/*.html", func=_build)
    server.watch("data/**/*.toml", func=_build)
    server.watch("public/**/*", func=copy_assets)
    tw_proc = subprocess.Popen(
        [
            "tailwindcss",
            "-w",
            "-i",
            "public/css/style.css",
            "-o",
            "output/css/style.css",
        ]
    )
    try:
        server.serve(root="output/")
    except KeyboardInterrupt:
        tw_proc.terminate()
        tw_proc.wait()
        raise
