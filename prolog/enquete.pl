:- module(enquete_api, [start/0]).
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_json)).
:- use_module(library(http/http_parameters)).
:- use_module(library(http/http_files)).
:- use_module(library(http/http_cors)).

%% --- Déclarations de routes HTTP ---
:- http_handler(root(api/suspects), suspects_endpoint, [method(get)]).
:- http_handler(root(api/crimes), crimes_endpoint, [method(get)]).
:- http_handler(root(api/evaluer), analyze_endpoint, [method(post)]).
:- http_handler(root(api/preuves), evidence_endpoint, [method(get)]).
:- http_handler(root(api/facts), knowledge_endpoint, [method(get)]).
:- http_handler(root(.), static_files, [prefix]).

%% --- CORS global ---
enable_cors(Request) :- 
    cors_enable(Request, [
        methods([get, post, options]),
        headers(['Content-Type', 'Authorization'])
    ]).

%% --- Règles de raisonnement ---
culpable(P, C) :-
    mobile(P, C),
    pres_de_scene(P, C),
    ( empreinte(P, C) ; temoin(P, C) ).

culpable(P, escroquerie) :-
    mobile(P, escroquerie),
    ( transaction(P, escroquerie) ; fausse_identite(P, escroquerie) ).

culpable(P, cybercrime) :-
    mobile(P, cybercrime),
    ( transaction(P, cybercrime) ; fausse_identite(P, cybercrime) ).

culpable(P, corruption) :-
    mobile(P, corruption),
    transaction(P, corruption).

%% Collecte et analyse des preuves
preuves_associees(P, C, Liste) :-
    findall(Ind, preuve(P, C, Ind), Liste).

preuve(P, C, mobile)          :- mobile(P, C).
preuve(P, C, pres_scene)      :- pres_de_scene(P, C).
preuve(P, C, empreinte)       :- empreinte(P, C).
preuve(P, C, temoin)          :- temoin(P, C).
preuve(P, C, transaction)     :- transaction(P, C).
preuve(P, C, fausse_identite):- fausse_identite(P, C).

niveau_confiance(P, C, Score) :-
    preuves_associees(P, C, L),
    length(L, N),
    Score is min(100, N*25).

%% --- Base de connaissances ---
infraction(assassinat).
infraction(vol).
infraction(escroquerie).
infraction(enlevement).
infraction(incendie).
infraction(cybercrime).
infraction(trafic).
infraction(corruption).

personne(john).
personne(mary).
personne(alice).
personne(bruno).
personne(sophie).
personne(pierre).
personne(chloe).
personne(marc).
personne(lea).
personne(victor).
personne(manon).

mobile(john, vol).
mobile(mary, assassinat).
mobile(alice, escroquerie).
mobile(bruno, escroquerie).
mobile(pierre, incendie).
mobile(chloe, enlevement).
mobile(marc, corruption).
mobile(lea, cybercrime).
mobile(victor, trafic).
mobile(manon, vol).

pres_de_scene(john, vol).
pres_de_scene(mary, assassinat).
pres_de_scene(pierre, incendie).
pres_de_scene(chloe, enlevement).
pres_de_scene(victor, trafic).
pres_de_scene(manon, vol).

empreinte(john, vol).
empreinte(mary, assassinat).
empreinte(pierre, incendie).
empreinte(victor, trafic).

transaction(alice, escroquerie).
transaction(bruno, escroquerie).
transaction(marc, corruption).
transaction(lea, cybercrime).

fausse_identite(sophie, escroquerie).
fausse_identite(chloe, enlevement).
fausse_identite(lea, cybercrime).

temoin(john, vol).
temoin(mary, assassinat).
temoin(pierre, incendie).
temoin(chloe, enlevement).
temoin(manon, vol).

%% --- Handlers API ---

% Liste des suspects
suspects_endpoint(Request) :-
    enable_cors(Request),
    findall(S, personne(S), Liste),
    reply_json_dict(_{suspects: Liste}).

% Liste des crimes
crimes_endpoint(Request) :-
    enable_cors(Request),
    findall(C, infraction(C), Liste),
    reply_json_dict(_{crimes: Liste}).

% Évaluation culpabilité
analyze_endpoint(Request) :-
    enable_cors(Request),
    http_read_json_dict(Request, Data),
    atom_string(P, Data.suspect),
    atom_string(C, Data.crime),
    ( culpable(P, C) -> Verdict = vrai ; Verdict = faux ),
    preuves_associees(P, C, E),
    niveau_confiance(P, C, Confiance),
    reply_json_dict(_{
        individu: Data.suspect,
        infraction: Data.crime,
        coupable: Verdict,
        confiance: Confiance,
        preuves: E
    }).

% Récupération des preuves
evidence_endpoint(Request) :-
    enable_cors(Request),
    http_parameters(Request, [
        suspect(P, [atom]),
        crime(C, [atom])
    ]),
    preuves_associees(P, C, E),
    reply_json_dict(_{suspect: P, crime: C, preuves: E}).

% Tous les faits
knowledge_endpoint(Request) :-
    enable_cors(Request),
    findall([X, Y], mobile(X,Y), Mobiles),
    findall([X, Y], pres_de_scene(X,Y), Pres),
    findall([X, Y], empreinte(X,Y), Emp),
    findall([X, Y], transaction(X,Y), Trans),
    findall([X, Y], fausse_identite(X,Y), Fake),
    findall([X, Y], temoin(X,Y), Tem),
    reply_json_dict(_{
        mobiles: Mobiles,
        pres_scene: Pres,
        empreintes: Emp,
        transactions: Trans,
        fausses_id: Fake,
        temoins: Tem
    }).

% Fichiers statiques
static_files(Request) :-
    http_reply_from_files('public', [indexes(['index.html'])], Request).

%% --- Serveur HTTP ---
server(Port) :-
    http_server(http_dispatch, [port(Port)]),
    format('[OK] Serveur enquete disponible sur http://localhost:~w/~n', [Port]).

%% --- Point d’entrée ---
start :-
    current_prolog_flag(argv, Args),
    (Args = [PortAtom|_], atom_number(PortAtom, Port) -> true ; Port = 8080),
    server(Port),
    thread_get_message(_).

:- initialization(start, main).