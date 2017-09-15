/**
 * Factory for creating action names
 */
export class ActionNameFactory {
	/**
   * Create action types for the given namespace and action type
   * @param type The type of the action
   * @param namespace the
   */
	static getActionName(type: string, namespace = 'App'): string {
		return `[${namespace.charAt(0).toUpperCase() +
			namespace.slice(1)}] ${type}`;
	}
}
