import { readFileSync } from "node:fs";
import { writeFile } from "node:fs/promises";

const randomId = () => {
  const id = `${Math.floor(Math.random() * 9000) + 1000}${
    Math.floor(Math.random() * 9000) + 1000
  }`;
  return Number(id);
};

export class JSONDatabase {
  /**@type {import("node:fs").PathLike} */
  #filepath;
  /**@type {Record<string, unknown>} */
  #db;

  /**
   * @param {import("node:fs").PathLike} filepath
   */
  constructor(filepath) {
    this.#filepath = filepath;
    this.#db = JSON.parse(readFileSync(filepath, "utf-8"));
  }

  get data() {
    return this.#db;
  }

  /**
   * @param {string} name
   * @returns {Array<Record<string, unknown>> | undefined}
   */
  #get(name) {
    return this.data[name];
  }

  async #write() {
    await writeFile(this.#filepath, JSON.stringify(this.data), "utf-8");
  }

  /**
   * @param {string} name
   * @returns {Array<Record<string, unknown>> | undefined}
   */
  find(name) {
    return this.#get(name);
  }

  /**
   * @param {string} name
   * @param {string} id
   * @returns {Array<Record<string, unknown>> | undefined}
   */
  findById(name, id) {
    const items = this.#get(name);
    if (Array.isArray(items)) {
      const item = items.find((item) => `${item.id}` === `${id}`);
      return item;
    }
  }

  /**
   *
   * @param {string} name
   * @param {Record<string, unknown>} data
   */
  async create(name, data) {
    const items = this.#get(name);
    if (!Array.isArray(items)) return;

    const item = { id: randomId(), ...data };
    items.push(item);
    await this.#write();
    return item;
  }

  /**
   *
   * @param {string} name
   * @param {string} id
   * @param {Record<string, unknown>} data
   */
  async updateById(name, id, data) {
    const items = this.#get(name);
    if (!Array.isArray(items)) return;

    const item = items.find((item) => `${item.id}` === `${id}`);
    if (!item) return;

    const updatedItem = { ...item, ...data, id };
    items.splice(items.indexOf(item), 1, updatedItem);
    await this.#write();
  }

  /**
   * @param {string} name
   * @param {string} id
   */
  async deleteById(name, id) {
    const items = this.#get(name);
    if (!Array.isArray(items)) return;

    const itemIndex = items.findIndex((item) => `${item.id}` === `${id}`);
    const item = items.splice(itemIndex, 1)[0];
    await this.#write();
    return item;
  }
}

export default JSONDatabase;
