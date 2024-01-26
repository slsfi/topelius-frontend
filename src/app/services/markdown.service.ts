import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { marked } from 'marked';

import { config } from '@config';


@Injectable({
  providedIn: 'root',
})
export class MarkdownService {
  private apiURL: string = '';

  constructor(
    private http: HttpClient
  ) {
    const apiBaseURL = config.app?.backendBaseURL ?? '';
    const projectName = config.app?.projectNameDB ?? '';
    this.apiURL = apiBaseURL + '/' + projectName;
  }

  getMenuTree(language: string, rootNodeID: string): Observable<any> {
    const endpoint = `${this.apiURL}/static-pages-toc/${language}`;
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        if (language && rootNodeID) {
          res = this.getNodeById(`${language}-${rootNodeID}`, res);
        } else {
          res = res.children[0].children;
        }
        res.id = this.stripLocaleFromID(res.id);
        this.stripLocaleFromAboutPagesIDs(res.children);
        return res;
      }),
      catchError((e) => {
        return of({});
      })
    );
  }

  /**
   * Get the content of a markdown file from the backend parsed to HTML as a string.
   * @param fileID ID of the file to get content of.
   * @param errorMessage optional message to display if the file content can’t be fetched.
   * @returns HTML as a string or null.
   */
  getParsedMdContent(fileID: string, errorMessage: string = ''): Observable<string | null> {
    return this.getMdContent(fileID).pipe(
      map((res: any) => {
        return res.content.trim() ? this.parseMd(res.content) : null;
      }),
      catchError((e: any) => {
        console.error('Error loading markdown content', e);
        return of(errorMessage || null);
      })
    );
  }

  /**
   * Get the content of a markdown file from the backend. Prefer using the
   * method 'getParsedMdContent' instead if you need the markdown parsed into HTML.
   * @param fileID ID of the file to get content of.
   * @returns object where the markdown content is in the 'content' property as a string.
   */
  getMdContent(fileID: string): Observable<any> {
    const endpoint = `${this.apiURL}/md/${fileID}`;
    return this.http.get(endpoint);
  }

  /**
   * Parses the given markdown to HTML and returns it as a string.
   */
  parseMd(md: string): string {
    return marked.parse(md) as string;
  }

  /**
   * Find a node by id in a JSON tree
   */
  private getNodeById(id: any, tree: any) {
    const reduce = [].reduce;
    const runner: any = (result: any, node: any) => {
      if (result || !node) {
        return result;
      }
      return (
        (node.id === id && node) ||
        runner(null, node.children) ||
        reduce.call(Object(node), runner, result)
      );
    };
    return runner(null, tree);
  }

  private stripLocaleFromAboutPagesIDs(array: any[]) {
    for (let i = 0; i < array.length; i++) {
      array[i]['id'] = this.stripLocaleFromID(array[i]['id']);
      if (array[i]['children']?.length) {
        this.stripLocaleFromAboutPagesIDs(array[i]['children']);
      }
    }
  }

  private stripLocaleFromID(id: string) {
    return id.slice(id.indexOf('-') + 1);
  }

}
