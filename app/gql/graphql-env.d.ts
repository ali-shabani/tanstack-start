/* eslint-disable */
/* prettier-ignore */

export type introspection_types = {
    'Boolean': unknown;
    'CacheControlScope': { name: 'CacheControlScope'; enumValues: 'PUBLIC' | 'PRIVATE'; };
    'Character': { kind: 'OBJECT'; name: 'Character'; fields: { 'created': { name: 'created'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'episode': { name: 'episode'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'OBJECT'; name: 'Episode'; ofType: null; }; }; } }; 'gender': { name: 'gender'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'id': { name: 'id'; type: { kind: 'SCALAR'; name: 'ID'; ofType: null; } }; 'image': { name: 'image'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'location': { name: 'location'; type: { kind: 'OBJECT'; name: 'Location'; ofType: null; } }; 'name': { name: 'name'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'origin': { name: 'origin'; type: { kind: 'OBJECT'; name: 'Location'; ofType: null; } }; 'species': { name: 'species'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'status': { name: 'status'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'type': { name: 'type'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; }; };
    'Characters': { kind: 'OBJECT'; name: 'Characters'; fields: { 'info': { name: 'info'; type: { kind: 'OBJECT'; name: 'Info'; ofType: null; } }; 'results': { name: 'results'; type: { kind: 'LIST'; name: never; ofType: { kind: 'OBJECT'; name: 'Character'; ofType: null; }; } }; }; };
    'Episode': { kind: 'OBJECT'; name: 'Episode'; fields: { 'air_date': { name: 'air_date'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'characters': { name: 'characters'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'OBJECT'; name: 'Character'; ofType: null; }; }; } }; 'created': { name: 'created'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'episode': { name: 'episode'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'id': { name: 'id'; type: { kind: 'SCALAR'; name: 'ID'; ofType: null; } }; 'name': { name: 'name'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; }; };
    'Episodes': { kind: 'OBJECT'; name: 'Episodes'; fields: { 'info': { name: 'info'; type: { kind: 'OBJECT'; name: 'Info'; ofType: null; } }; 'results': { name: 'results'; type: { kind: 'LIST'; name: never; ofType: { kind: 'OBJECT'; name: 'Episode'; ofType: null; }; } }; }; };
    'FilterCharacter': { kind: 'INPUT_OBJECT'; name: 'FilterCharacter'; isOneOf: false; inputFields: [{ name: 'name'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'status'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'species'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'type'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'gender'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }]; };
    'FilterEpisode': { kind: 'INPUT_OBJECT'; name: 'FilterEpisode'; isOneOf: false; inputFields: [{ name: 'name'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'episode'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }]; };
    'FilterLocation': { kind: 'INPUT_OBJECT'; name: 'FilterLocation'; isOneOf: false; inputFields: [{ name: 'name'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'type'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'dimension'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }]; };
    'ID': unknown;
    'Info': { kind: 'OBJECT'; name: 'Info'; fields: { 'count': { name: 'count'; type: { kind: 'SCALAR'; name: 'Int'; ofType: null; } }; 'next': { name: 'next'; type: { kind: 'SCALAR'; name: 'Int'; ofType: null; } }; 'pages': { name: 'pages'; type: { kind: 'SCALAR'; name: 'Int'; ofType: null; } }; 'prev': { name: 'prev'; type: { kind: 'SCALAR'; name: 'Int'; ofType: null; } }; }; };
    'Int': unknown;
    'Location': { kind: 'OBJECT'; name: 'Location'; fields: { 'created': { name: 'created'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'dimension': { name: 'dimension'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'id': { name: 'id'; type: { kind: 'SCALAR'; name: 'ID'; ofType: null; } }; 'name': { name: 'name'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'residents': { name: 'residents'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'OBJECT'; name: 'Character'; ofType: null; }; }; } }; 'type': { name: 'type'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; }; };
    'Locations': { kind: 'OBJECT'; name: 'Locations'; fields: { 'info': { name: 'info'; type: { kind: 'OBJECT'; name: 'Info'; ofType: null; } }; 'results': { name: 'results'; type: { kind: 'LIST'; name: never; ofType: { kind: 'OBJECT'; name: 'Location'; ofType: null; }; } }; }; };
    'Query': { kind: 'OBJECT'; name: 'Query'; fields: { 'character': { name: 'character'; type: { kind: 'OBJECT'; name: 'Character'; ofType: null; } }; 'characters': { name: 'characters'; type: { kind: 'OBJECT'; name: 'Characters'; ofType: null; } }; 'charactersByIds': { name: 'charactersByIds'; type: { kind: 'LIST'; name: never; ofType: { kind: 'OBJECT'; name: 'Character'; ofType: null; }; } }; 'episode': { name: 'episode'; type: { kind: 'OBJECT'; name: 'Episode'; ofType: null; } }; 'episodes': { name: 'episodes'; type: { kind: 'OBJECT'; name: 'Episodes'; ofType: null; } }; 'episodesByIds': { name: 'episodesByIds'; type: { kind: 'LIST'; name: never; ofType: { kind: 'OBJECT'; name: 'Episode'; ofType: null; }; } }; 'location': { name: 'location'; type: { kind: 'OBJECT'; name: 'Location'; ofType: null; } }; 'locations': { name: 'locations'; type: { kind: 'OBJECT'; name: 'Locations'; ofType: null; } }; 'locationsByIds': { name: 'locationsByIds'; type: { kind: 'LIST'; name: never; ofType: { kind: 'OBJECT'; name: 'Location'; ofType: null; }; } }; }; };
    'String': unknown;
    'Upload': unknown;
};

/** An IntrospectionQuery representation of your schema.
 *
 * @remarks
 * This is an introspection of your schema saved as a file by GraphQLSP.
 * It will automatically be used by `gql.tada` to infer the types of your GraphQL documents.
 * If you need to reuse this data or update your `scalars`, update `tadaOutputLocation` to
 * instead save to a .ts instead of a .d.ts file.
 */
export type introspection = {
  name: never;
  query: 'Query';
  mutation: never;
  subscription: never;
  types: introspection_types;
};

import * as gqlTada from 'gql.tada';

declare module 'gql.tada' {
  interface setupSchema {
    introspection: introspection
  }
}