import { ReqParams, ResAuth, ResResult } from './model'
import { get, post } from '/@/utils/axios'

enum URL {
  login = '/v1/user/login',
  permission = '/v1/user/permission',
}

const login = async (data: ReqParams) => post<ResResult>({ url: URL.login, data })

const permission = async () => get<ResAuth>({ url: URL.permission })

export default { login, permission }
