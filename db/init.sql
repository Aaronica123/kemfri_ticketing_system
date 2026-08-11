--
-- PostgreSQL database dump
--

\restrict u8aRBbZdkWWWojltUa9fAesnHLRM8GuuayeTttz9wUA62NZWbALZxkffCxH50UA

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: kemfri_schema; Type: SCHEMA; Schema: -; Owner: postgres
--
CREATE DATABASE kemfri_database;
CREATE SCHEMA kemfri_schema;
CREATE USER users PASSWORD 'kemfri';
CREATE USER staff PASSWORD 'kemfri';

ALTER SCHEMA kemfri_schema OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: category; Type: TABLE; Schema: kemfri_schema; Owner: postgres
--

CREATE TABLE kemfri_schema.category (
    category_id integer NOT NULL,
    category_name character varying(100),
    CONSTRAINT category_id_check CHECK ((category_id > 0)),
    CONSTRAINT category_input_check CHECK (((category_name)::text ~ '^[a-zA-Z]+$'::text))
);


ALTER TABLE kemfri_schema.category OWNER TO postgres;

--
-- Name: priority; Type: TABLE; Schema: kemfri_schema; Owner: postgres
--

CREATE TABLE kemfri_schema.priority (
    id_ integer NOT NULL,
    priority character varying(100),
    CONSTRAINT priority_id_check CHECK ((id_ > 0)),
    CONSTRAINT priority_input_check CHECK (((priority)::text ~ '^[a-zA-Z]+$'::text))
);


ALTER TABLE kemfri_schema.priority OWNER TO postgres;

--
-- Name: register; Type: TABLE; Schema: kemfri_schema; Owner: postgres
--

CREATE TABLE kemfri_schema.register (
    id integer NOT NULL,
    email character varying(100) NOT NULL,
    password_ character varying(255) NOT NULL,
    staff_id character varying(255) NOT NULL,
    first_name character varying(255) DEFAULT NULL::character varying,
    last_name character varying(255) DEFAULT NULL::character varying,
    category_id integer,
    CONSTRAINT register_ch CHECK ((((email)::text ~~ '%@kemfri.com'::text) AND ((email)::text !~~ '%--%'::text) AND ((email)::text !~~ '%;%'::text) AND ((email)::text ~ '^[a-zA-Z0-9]+@kemfri\.com$'::text) AND ((email)::text ~ '[0-9]{3}'::text)))
);


ALTER TABLE kemfri_schema.register OWNER TO postgres;

--
-- Name: register_id_seq; Type: SEQUENCE; Schema: kemfri_schema; Owner: postgres
--

CREATE SEQUENCE kemfri_schema.register_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE kemfri_schema.register_id_seq OWNER TO postgres;

--
-- Name: register_id_seq; Type: SEQUENCE OWNED BY; Schema: kemfri_schema; Owner: postgres
--

ALTER SEQUENCE kemfri_schema.register_id_seq OWNED BY kemfri_schema.register.id;


--
-- Name: sessions; Type: TABLE; Schema: kemfri_schema; Owner: postgres
--

CREATE TABLE kemfri_schema.sessions (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);


ALTER TABLE kemfri_schema.sessions OWNER TO postgres;

--
-- Name: staff_registry; Type: TABLE; Schema: kemfri_schema; Owner: postgres
--

CREATE TABLE kemfri_schema.staff_registry (
    email character varying(255) NOT NULL,
    staff_password character varying(255) NOT NULL,
    staff_role character varying(255),
    first_name character varying(255),
    staff_id character varying(10)
);


ALTER TABLE kemfri_schema.staff_registry OWNER TO postgres;

--
-- Name: tickets; Type: TABLE; Schema: kemfri_schema; Owner: postgres
--

CREATE TABLE kemfri_schema.tickets (
    ticket_id character varying(10) NOT NULL,
    category_id integer,
    priority_id integer,
    pending boolean DEFAULT true,
    resolved boolean DEFAULT false,
    date_entered date DEFAULT CURRENT_DATE,
    time_entered time without time zone DEFAULT CURRENT_TIME,
    staff_id character varying(100),
    ticket_issue character varying(255),
    user_id character varying(100),
    CONSTRAINT ticket_issue_check CHECK (((ticket_issue)::text ~ '^[a-zA-Z ]+$'::text)),
    CONSTRAINT tickets_id_check CHECK (((ticket_id)::text ~ '^[A-Z0-9]+$'::text))
);


ALTER TABLE kemfri_schema.tickets OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: kemfri_schema; Owner: postgres
--

CREATE TABLE kemfri_schema.users (
    user_email character varying(100),
    user_id integer NOT NULL,
    user_role character varying(10) DEFAULT 'user'::character varying,
    first_name character varying(100),
    user_password character varying(255) NOT NULL,
    CONSTRAINT first_name_check CHECK (((first_name)::text ~ '^[a-zA-Z]+$'::text)),
    CONSTRAINT user_email_check CHECK (((user_email)::text ~ '^[a-zA-Z0-9{3}]+@kemfri\.com$'::text))
);


ALTER TABLE kemfri_schema.users OWNER TO postgres;

--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    role_id integer NOT NULL,
    role_name character varying(10)
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: staff; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.staff (
    staff_id integer NOT NULL,
    staff_name character varying(50),
    role_id integer
);


ALTER TABLE public.staff OWNER TO postgres;

--
-- Name: register id; Type: DEFAULT; Schema: kemfri_schema; Owner: postgres
--

ALTER TABLE ONLY kemfri_schema.register ALTER COLUMN id SET DEFAULT nextval('kemfri_schema.register_id_seq'::regclass);


--
-- Data for Name: category; Type: TABLE DATA; Schema: kemfri_schema; Owner: postgres
--

COPY kemfri_schema.category (category_id, category_name) FROM stdin;
1	Hardware
2	Software
3	Network
4	Email
5	Printer
6	Account
7	Phone
9	Others
8	ERP
\.


--
-- Data for Name: priority; Type: TABLE DATA; Schema: kemfri_schema; Owner: postgres
--

COPY kemfri_schema.priority (id_, priority) FROM stdin;
1	Low
2	Medium
3	High
4	Urgent
\.


--
-- Data for Name: register; Type: TABLE DATA; Schema: kemfri_schema; Owner: postgres
--

COPY kemfri_schema.register (id, email, password_, staff_id, first_name, last_name, category_id) FROM stdin;
34	staff100@kemfri.com	staff100	staff100	James	\N	1
35	staff100@kemfri.com	staff100	staff100	James	\N	2
42	staff100@kemfri.com	staff100	staff100	James	\N	9
36	staff200@kemfri.com	staff200	staff200	Mary	\N	2
37	staff200@kemfri.com	staff200	staff200	Mary	\N	3
43	staff200@kemfri.com	staff200	staff200	Mary	\N	9
38	staff300@kemfri.com	staff300	staff300	Jude	\N	3
39	staff300@kemfri.com	staff300	staff300	Jude	\N	4
44	staff300@kemfri.com	staff300	staff300	Jude	\N	9
40	staff400@kemfri.com	staff400	staff400	Bob	\N	4
45	staff400@kemfri.com	staff400	staff400	Bob	\N	9
41	staff500@kemfri.com	staff500	staff500	Peter	\N	5
46	staff500@kemfri.com	staff500	staff500	Peter	\N	9
47	staff700@kemfri.com	staff700	staff700	Gideon	\N	1
1	staff700@kemfri.com	staff700	staff700	Gideon	\N	6
2	staff300@kemfri.com	staff300	staff300	Jude	\N	6
3	staff600@kemfri.com	staff600	staff600	Mike	\N	8
4	staff800@kemfri.com	staff800	staff800	Abigael	\N	7
5	staff600@kemfri.com	staff600	staff600	Mike	\N	7
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: kemfri_schema; Owner: postgres
--

COPY kemfri_schema.sessions (sid, sess, expire) FROM stdin;
\.


--
-- Data for Name: staff_registry; Type: TABLE DATA; Schema: kemfri_schema; Owner: postgres
--

COPY kemfri_schema.staff_registry (email, staff_password, staff_role, first_name, staff_id) FROM stdin;
user123@kemfri.com	user123	Registry	James	100
user456@kemfri.com	user456	Accountant	Mary	201
staff100@kemfri.com	staff100	ICT STAFF	James	staff100
staff200@kemfri.com	staff200	ICT STAFF	Mary	staff200
staff300@kemfri.com	staff300	ICT STAFF	Jude	staff300
staff400@kemfri.com	staff400	ICT STAFF	Bob	staff400
staff500@kemfri.com	staff500	ICT STAFF	Peter	staff500
staff700@kemfri.com	staff700	ICT STAFF	Gideon	staff700
staff600@kemfri.com	staff600	ICT STAFF	Mike	staff600
staff800@kemfri.com	staff800	ICT STAFF	Abigael	staff800
\.


--
-- Data for Name: tickets; Type: TABLE DATA; Schema: kemfri_schema; Owner: postgres
--

COPY kemfri_schema.tickets (ticket_id, category_id, priority_id, pending, resolved, date_entered, time_entered, staff_id, ticket_issue, user_id) FROM stdin;
B0B968	1	1	f	t	2026-08-04	14:25:44.872165	staff100	Keyboard failure	100
02972A	2	3	f	t	2026-08-04	14:28:12.886689	staff200	Software failure	100
A88174	3	3	t	f	2026-08-04	14:32:07.644011	staff300	Network failid	100
FBA78A	3	2	t	f	2026-08-04	14:32:20.270341	staff200	Network not working	100
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: kemfri_schema; Owner: postgres
--

COPY kemfri_schema.users (user_email, user_id, user_role, first_name, user_password) FROM stdin;
user123@kemfri.com	100	Registry	James	user123
user456@kemfri.com	201	Accountant	Mary	user456
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (role_id, role_name) FROM stdin;
\.


--
-- Data for Name: staff; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.staff (staff_id, staff_name, role_id) FROM stdin;
\.


--
-- Name: register_id_seq; Type: SEQUENCE SET; Schema: kemfri_schema; Owner: postgres
--

SELECT pg_catalog.setval('kemfri_schema.register_id_seq', 5, true);


--
-- Name: category category_pk; Type: CONSTRAINT; Schema: kemfri_schema; Owner: postgres
--

ALTER TABLE ONLY kemfri_schema.category
    ADD CONSTRAINT category_pk PRIMARY KEY (category_id);


--
-- Name: category category_uq; Type: CONSTRAINT; Schema: kemfri_schema; Owner: postgres
--

ALTER TABLE ONLY kemfri_schema.category
    ADD CONSTRAINT category_uq UNIQUE (category_id);


--
-- Name: register composite_pk; Type: CONSTRAINT; Schema: kemfri_schema; Owner: postgres
--

ALTER TABLE ONLY kemfri_schema.register
    ADD CONSTRAINT composite_pk UNIQUE (staff_id, category_id);


--
-- Name: priority prioity_pk; Type: CONSTRAINT; Schema: kemfri_schema; Owner: postgres
--

ALTER TABLE ONLY kemfri_schema.priority
    ADD CONSTRAINT prioity_pk PRIMARY KEY (id_);


--
-- Name: priority priority_uq; Type: CONSTRAINT; Schema: kemfri_schema; Owner: postgres
--

ALTER TABLE ONLY kemfri_schema.priority
    ADD CONSTRAINT priority_uq UNIQUE (priority);


--
-- Name: register register_pk; Type: CONSTRAINT; Schema: kemfri_schema; Owner: postgres
--

ALTER TABLE ONLY kemfri_schema.register
    ADD CONSTRAINT register_pk PRIMARY KEY (id);


--
-- Name: sessions session_pkey; Type: CONSTRAINT; Schema: kemfri_schema; Owner: postgres
--

ALTER TABLE ONLY kemfri_schema.sessions
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- Name: staff_registry staff_id_uq; Type: CONSTRAINT; Schema: kemfri_schema; Owner: postgres
--

ALTER TABLE ONLY kemfri_schema.staff_registry
    ADD CONSTRAINT staff_id_uq UNIQUE (staff_id);


--
-- Name: staff_registry staff_registry_pk; Type: CONSTRAINT; Schema: kemfri_schema; Owner: postgres
--

ALTER TABLE ONLY kemfri_schema.staff_registry
    ADD CONSTRAINT staff_registry_pk PRIMARY KEY (email);


--
-- Name: tickets tickets_pk; Type: CONSTRAINT; Schema: kemfri_schema; Owner: postgres
--

ALTER TABLE ONLY kemfri_schema.tickets
    ADD CONSTRAINT tickets_pk PRIMARY KEY (ticket_id);


--
-- Name: users user_email_unique; Type: CONSTRAINT; Schema: kemfri_schema; Owner: postgres
--

ALTER TABLE ONLY kemfri_schema.users
    ADD CONSTRAINT user_email_unique UNIQUE (user_email);


--
-- Name: users user_id_pk; Type: CONSTRAINT; Schema: kemfri_schema; Owner: postgres
--

ALTER TABLE ONLY kemfri_schema.users
    ADD CONSTRAINT user_id_pk PRIMARY KEY (user_id);


--
-- Name: roles roles_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pk PRIMARY KEY (role_id);


--
-- Name: staff staff_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.staff
    ADD CONSTRAINT staff_pk PRIMARY KEY (staff_id);


--
-- Name: IDX_session_expire; Type: INDEX; Schema: kemfri_schema; Owner: postgres
--

CREATE INDEX "IDX_session_expire" ON kemfri_schema.sessions USING btree (expire);


--
-- Name: reg_index1e; Type: INDEX; Schema: kemfri_schema; Owner: postgres
--

CREATE INDEX reg_index1e ON kemfri_schema.register USING btree (staff_id);


--
-- Name: register register_category_fk; Type: FK CONSTRAINT; Schema: kemfri_schema; Owner: postgres
--

ALTER TABLE ONLY kemfri_schema.register
    ADD CONSTRAINT register_category_fk FOREIGN KEY (category_id) REFERENCES kemfri_schema.category(category_id);


--
-- Name: tickets staff_registry_tickets_fk; Type: FK CONSTRAINT; Schema: kemfri_schema; Owner: postgres
--

ALTER TABLE ONLY kemfri_schema.tickets
    ADD CONSTRAINT staff_registry_tickets_fk FOREIGN KEY (user_id) REFERENCES kemfri_schema.staff_registry(staff_id);


--
-- Name: tickets ticket_category_fk; Type: FK CONSTRAINT; Schema: kemfri_schema; Owner: postgres
--

ALTER TABLE ONLY kemfri_schema.tickets
    ADD CONSTRAINT ticket_category_fk FOREIGN KEY (category_id) REFERENCES kemfri_schema.category(category_id);


--
-- Name: tickets ticket_priority_fk; Type: FK CONSTRAINT; Schema: kemfri_schema; Owner: postgres
--

ALTER TABLE ONLY kemfri_schema.tickets
    ADD CONSTRAINT ticket_priority_fk FOREIGN KEY (priority_id) REFERENCES kemfri_schema.priority(id_);


--
-- Name: tickets ticket_staff_fk; Type: FK CONSTRAINT; Schema: kemfri_schema; Owner: postgres
--

ALTER TABLE ONLY kemfri_schema.tickets
    ADD CONSTRAINT ticket_staff_fk FOREIGN KEY (staff_id, category_id) REFERENCES kemfri_schema.register(staff_id, category_id);


--
-- Name: staff staff_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.staff
    ADD CONSTRAINT staff_fk FOREIGN KEY (role_id) REFERENCES public.roles(role_id);


--
-- Name: register; Type: ROW SECURITY; Schema: kemfri_schema; Owner: postgres
--

ALTER TABLE kemfri_schema.register ENABLE ROW LEVEL SECURITY;

--
-- Name: SCHEMA kemfri_schema; Type: ACL; Schema: -; Owner: postgres
--

GRANT USAGE ON SCHEMA kemfri_schema TO users;
GRANT USAGE ON SCHEMA kemfri_schema TO staff;


--
-- Name: TABLE category; Type: ACL; Schema: kemfri_schema; Owner: postgres
--

GRANT SELECT ON TABLE kemfri_schema.category TO staff;
GRANT SELECT ON TABLE kemfri_schema.category TO users;


--
-- Name: TABLE priority; Type: ACL; Schema: kemfri_schema; Owner: postgres
--

GRANT SELECT ON TABLE kemfri_schema.priority TO staff;
GRANT SELECT ON TABLE kemfri_schema.priority TO users;


--
-- Name: TABLE register; Type: ACL; Schema: kemfri_schema; Owner: postgres
--

GRANT SELECT ON TABLE kemfri_schema.register TO staff;


--
-- Name: TABLE sessions; Type: ACL; Schema: kemfri_schema; Owner: postgres
--

GRANT ALL ON TABLE kemfri_schema.sessions TO PUBLIC;


--
-- Name: TABLE tickets; Type: ACL; Schema: kemfri_schema; Owner: postgres
--

GRANT SELECT,INSERT,UPDATE ON TABLE kemfri_schema.tickets TO staff;
GRANT SELECT,INSERT ON TABLE kemfri_schema.tickets TO users;


--
-- Name: TABLE users; Type: ACL; Schema: kemfri_schema; Owner: postgres
--

GRANT SELECT ON TABLE kemfri_schema.users TO users;


--
-- PostgreSQL database dump complete
--

\unrestrict u8aRBbZdkWWWojltUa9fAesnHLRM8GuuayeTttz9wUA62NZWbALZxkffCxH50UA

