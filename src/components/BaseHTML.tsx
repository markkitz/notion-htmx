export default function BaseHTML({ children }: { children: JSX.Element }) {
    return (
        <html>
            <head>
                <title>Elysia</title>
                <link rel="stylesheet" href="/public/dist/unocss.css" />
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@unocss/reset/tailwind.min.css" />
                <script src="https://unpkg.com/htmx.org@1.9.5"></script>
                <script src="https://unpkg.com/hyperscript.org@0.9.11"></script>
                <script src="https://cdn.jsdelivr.net/npm/sortablejs@1.15.2/Sortable.min.js"></script>
                <script src="/public/dist/scripts.js"></script>
                {`<style>
                .row-being-dragged{
                    background-color: #0c0a09;
                    margin-top: 5px;
                    margin-bottom:5px;
                }
                .row-being-dragged > .row-drag-menu {
                opacity: 1.0 !important;
                }
                .sortable-chosen.sortable-ghost {
                opacity: 0;
                }
                .sortable-fallback {
                opacity: 1 !important;
                }
                .sortable-drag { opacity: 0; }
            </style>`}
            </head>
            <body>
                <div class="flex justify-center pt-10 bg-zinc-900 min-h-screen text-sm">
                    {children}
                </div>
            </body>
        </html>
    )
}